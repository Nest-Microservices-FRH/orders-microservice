import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';
import { HasMany } from 'sequelize-typescript';

@Table({
    modelName      : 'orders',
    freezeTableName: true,
    timestamps     : true,
})
export class Order extends Model<Order>{
    @Column({
        field       : 'id',
        primaryKey  : true,
        allowNull   : false,
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    })
        id: string;

    @Column({
        field       : 'totalAmount',
        allowNull   : false,
        type        : DataTypes.FLOAT,
        defaultValue: 0.0,
    })
        totalAmount: number;

    @Column({
        field       : 'totalItems',
        allowNull   : false,
        type        : DataTypes.INTEGER, // Entero para la cantidad de artículos
        defaultValue: 1,         // Valor predeterminado si no se especifica
    })
        totalItems: number;

    @Column({
        field       : 'status',
        allowNull   : false,
        type        : DataTypes.ENUM('PENDING', 'DELIVERED', 'CANCELLED'), // Valores aceptados
        defaultValue: 'PENDING',                                  // Estado predeterminado
    })
        status: string;

    @Column({
        field       : 'paid',
        allowNull   : false,
        type        : DataTypes.BOOLEAN, // Indica si está pagado
        defaultValue: false,     // Por defecto, no pagado
    })
        paid: boolean;

    @Column({
        field    : 'paidAt',
        allowNull: true,
        type     : DataTypes.DATE,
    })
        paidAt: string;

    @HasMany(() => OrderItem)
        orderItems: OrderItem[];

    @Column({
        field       : 'createdAt',
        allowNull   : true,
        type        : DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    })
        createdAt: string;

    @Column({
        field    : 'updatedAt',
        allowNull: true,
        type     : DataTypes.DATE,
    })
        updatedAt: string;
}