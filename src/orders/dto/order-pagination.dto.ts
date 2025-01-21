import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enums';

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `status must be a valid enum value. Valid options are ${Object.values(OrderStatus)}`,
    })
        status?: OrderStatus;
}