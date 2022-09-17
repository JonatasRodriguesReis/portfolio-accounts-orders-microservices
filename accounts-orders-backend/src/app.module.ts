import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AccountsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
