import { Account } from '../entities/account.entity';
import { OrderStatus } from '../entities/order.entity';

export interface CreateOrderDTO {
  amount: number;
  creditCardNumber: string;
  creditCardName: string;
  //status: OrderStatus;
}

export interface OutputOrderDTO {
  id: string;
  amount: number;
  creditCardNumber: string;
  creditCardName: string;
  status: OrderStatus;
  accountId: string;
  account?: Account;
}

export interface UpdateOrderDTO {
  amount?: number;
  creditCardNumber?: string;
  creditCardName?: string;
  status?: OrderStatus;
}
