import { Test, TestingModule } from '@nestjs/testing';
import { AccountsModule } from '../accounts/accounts.module';
import { OrderService } from '../@core/domain/services/order.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
      controllers: [OrdersController],
      providers: [OrdersService, OrderService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
