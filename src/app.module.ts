import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { envs } from './config';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
    imports: [
        OrdersModule,
        SequelizeModule.forRoot({
            dialect       : envs.dialect,
            host          : envs.dbHost,
            port          : envs.dbPort,
            username      : envs.dbUser,
            password      : envs.dbPassword,
            database      : envs.dbName,
            autoLoadModels: envs.autoLoadModels,
            synchronize   : envs.synchronize,
            logging       : envs.logging ? console.log : false,
            //ssl           : false, // Indica que SSL está habilitado
            // dialectOptions: {
            //     ssl: {
            //         require           : true, // Requiere conexión SSL
            //         rejectUnauthorized: false, // Permite certificados autofirmados
            //     },
            // },
            models: [
                Order,
                OrderItem,
            ],
        }),
    ],
    controllers: [],
    providers  : [],
})
export class AppModule {}
