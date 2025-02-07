import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto';
import { PaginatedOrders } from './entities';
import { PRODUCT_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
        @InjectModel(OrderItem)
        private orderItemModel: typeof OrderItem,
        @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
    ) {}

    //: Promise<Order>
    async create(createOrderDto: CreateOrderDto) {

        try {
            // group products by id
            const productIds = createOrderDto.items.map(product => product.productId);
            // validate products
            const products = await firstValueFrom(
                this.productsClient.send({ cmd: 'validate_products' }, productIds),
            );

            const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
                const price = products.find(
                    product => product.id === orderItem.productId,
                ).price;

                return price * orderItem.quantity;

            }, 0);

            const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
                return acc + orderItem.quantity;
            }, 0);

            // Crear instancias de OrderItem
            const orderItems = await Promise.all(createOrderDto.items.map(async item => {
                const product = products.find(product => product.id === item.productId);
                return this.orderItemModel.build({
                    productId: item.productId,
                    quantity : item.quantity,
                    price    : product.price,
                // Puedes agregar más propiedades si es necesario
                });
            }));

            // create db transaction
            const order = await this.orderModel.create({
                totalAmount,
                totalItems,
                orderItems,
            }, {
                include: [OrderItem],
            });

            return {
                ...order.toJSON(),
                orderItems: orderItems.map(item => ({
                    ...item.toJSON(),
                    name: products.find(product => product.id === item.productId).name,
                })),
            };
        } catch {
            throw new RpcException({
                status : HttpStatus.BAD_REQUEST,
                message: 'Check logs for more details',
            });
        }

    }

    async findAll(
        paginationDto: OrderPaginationDto,
    ): Promise<PaginatedOrders> {
        const statusFilter = paginationDto.status ? { status: paginationDto.status } : {};

        const totalPages = await this.orderModel.count({
            where: statusFilter,
        });

        const currentPage = paginationDto.page;
        const perPage = paginationDto.limit;

        return {
            data: await this.orderModel.findAll({
                offset: (currentPage - 1) * perPage,
                limit : perPage,
                where : statusFilter,
            }),
            meta: {
                total   : totalPages,
                page    : currentPage,
                lastPage: Math.ceil(totalPages / perPage),
            },
        };
    }

    async findOne(id: string): Promise<Order> {
        const order = await this.orderModel.findByPk(id);

        if (!order) {
            throw new RpcException({
                status : HttpStatus.NOT_FOUND,
                message: `Order with id ${id} not found`,
            });
        }

        return order;
    }

    async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto): Promise<Order> {
        const { id, status } = changeOrderStatusDto;

        const order = await this.findOne(id);

        if (order.status === status) {
            throw new RpcException({
                status : HttpStatus.BAD_REQUEST,
                message: `Order is already ${status}`,
            });
        }
        await this.orderModel.update({
            status,
        }, {
            where: { id },
        });

        return await this.findOne(id);
    }
}
