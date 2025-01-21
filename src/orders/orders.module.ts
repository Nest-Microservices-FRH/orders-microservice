import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';

@Module({
    controllers: [OrdersController],
    providers  : [OrdersService],
    imports    : [
        SequelizeModule.forFeature([Order]),
    ],
    exports: [SequelizeModule],
})
export class OrdersModule {}
