import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
    ) {}

    create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderModel.create(createOrderDto);
    }

    findAll() {
        return 'This action returns all orders';
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
}
