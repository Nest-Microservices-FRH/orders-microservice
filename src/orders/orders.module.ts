import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
    controllers: [OrdersController],
    providers  : [OrdersService],
    imports    : [
        SequelizeModule.forFeature([Order]),
        ClientsModule.register([
            {
                name     : PRODUCT_SERVICE,
                transport: Transport.TCP,
                options  : {
                    host: envs.productsMsHost,
                    port: envs.productsMsPort,
                },
            },
        ]),
    ],
    exports: [SequelizeModule],
})
export class OrdersModule {}
