import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { NatsModule } from 'src/transports/nats.module';

@Module({
    controllers: [OrdersController],
    providers  : [OrdersService],
    imports    : [
        SequelizeModule.forFeature([Order]),
        SequelizeModule.forFeature([OrderItem]),
        NatsModule,
    ],
    exports: [SequelizeModule],
})
export class OrdersModule {}
