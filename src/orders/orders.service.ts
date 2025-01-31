import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto';
import { PaginatedOrders } from './entities';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
    ) {}

    //: Promise<Order>
    create(createOrderDto: CreateOrderDto) {

        return {
            service: 'Orders Microservice',
            createOrderDto,
        };
        //return this.orderModel.create(createOrderDto);
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
