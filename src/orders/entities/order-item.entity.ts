import { DataTypes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Order } from './order.entity';

@Table({
    modelName      : 'orderItems',
    freezeTableName: true,
    timestamps     : true,
})
export class OrderItem extends Model<OrderItem>{
    @Column({
        field       : 'id',
        primaryKey  : true,
        allowNull   : false,
        type        : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    })
        id: string;

    @ForeignKey(() => Order)
    @Column({
        field    : 'orderId',
        allowNull: true,
        type     : DataTypes.UUID,
    })
        orderId: string;

    @BelongsTo(() => Order)
        order: Order;

    @Column({
        field    : 'productId',
        allowNull: false,
        type     : DataTypes.INTEGER,
    })
        productId: number;

    @Column({
        field       : 'quantity',
        allowNull   : false,
        type        : DataTypes.INTEGER,
        defaultValue: 1,
    })
        quantity: number;

    @Column({
        field    : 'price',
        allowNull: false,
        type     : DataTypes.FLOAT,
    })
        price: number;

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