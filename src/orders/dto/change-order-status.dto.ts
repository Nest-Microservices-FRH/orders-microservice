import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from '../enums';

export class ChangeOrderStatusDto {
    @IsUUID()
        id: string;

    @IsEnum( OrderStatus,
        {
            message: `Status must be one of the following values: ${Object.values(OrderStatus).join(', ')}`,
        },
    )
        status: OrderStatus;
}
