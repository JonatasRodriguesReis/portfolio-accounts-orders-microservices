import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderService } from 'src/@core/domain/services/order.service';
import { OrderRepository } from 'src/@core/domain/repositories/order.repository';
import { OrderMemoryRepository } from 'src/@core/infra/memory/order-memory.repository';
import { AccountsModule } from 'src/accounts/accounts.module';
import { AccountStorageService } from 'src/@core/domain/services/account-storage.service';

@Module({
  imports: [AccountsModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: OrderMemoryRepository,
      useFactory: () => {
        return new OrderMemoryRepository();
      },
    },
    {
      provide: OrderService,
      useFactory: (
        orderRepository: OrderRepository,
        accountStorageService: AccountStorageService,
      ) => {
        return new OrderService(orderRepository, accountStorageService);
      },
      inject: [OrderMemoryRepository, AccountStorageService],
    },
  ],
})
export class OrdersModule {}
