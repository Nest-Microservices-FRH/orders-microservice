import { Controller, NotImplementedException, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { PaginationDto } from 'src/common';
import { OrderPaginationDto } from './dto';

@Controller()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('createOrder')
    create(@Payload() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }

  @MessagePattern('findAllOrders')
  findAll(
    @Payload() paginationDto: OrderPaginationDto,
  ) {
      return this.ordersService.findAll(paginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string): Promise<Order> {
      return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDto: UpdateOrderDto) {
      //return this.ordersService.changeStatus();
      throw new NotImplementedException();
  }
}
