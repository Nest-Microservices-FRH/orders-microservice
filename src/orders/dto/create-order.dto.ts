import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { OrderStatus } from '../enums';

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
        totalAmount: number;

    @IsNumber()
    @IsPositive()
        totalItems: number;

    @IsEnum(OrderStatus, {
        message: `status must be a valid value. Valids are ${Object.values(OrderStatus).join(', ')}`,
    })
    @IsOptional()
        status: OrderStatus = OrderStatus.PENDING;

    @IsBoolean()
    @IsOptional()
        paid: boolean = false;
}
