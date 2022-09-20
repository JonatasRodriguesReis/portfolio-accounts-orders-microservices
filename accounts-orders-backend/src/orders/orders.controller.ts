import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from '../@core/domain/services/order.service';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from '../@core/domain/dtos/order.dtos';
import { TokenGuard } from '../accounts/token-guard';

@Controller('orders')
@UseGuards(TokenGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDTO) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAllByAccountId() {
    return this.ordersService.findAllByAccountId();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDTO) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.removeOrder(id);
  }
}
