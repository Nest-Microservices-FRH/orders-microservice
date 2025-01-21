import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
    private readonly logger = new Logger(OrdersService.name);
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
    ) {}

    create(createOrderDto: CreateOrderDto) {
        return this.orderModel.create(createOrderDto);
    }

    findAll() {
        return 'This action returns all ordersaaaaaa';
    }

    findOne(id: number) {
        return `This action returns a #${id} orderdsdsdsd`;
    }
}
