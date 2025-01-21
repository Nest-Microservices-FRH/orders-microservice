import { Order } from './order.entity';

export class PaginatedOrders {
    data: Order[];
    meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}