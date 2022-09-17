import { v4 as uuid } from 'uuid';

export enum OrderStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class Order {
  readonly id: string;
  readonly amount: number;
  readonly creditCardNumber: string;
  readonly creditCardName: string;
  readonly status: OrderStatus;
  readonly accountId: string;

  constructor(
    amount: number,
    creditCardNumber: string,
    creditCardName: string,
    accountId: string,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.amount = amount;
    this.creditCardNumber = creditCardNumber;
    this.creditCardName = creditCardName;
    this.status = OrderStatus.Pending;
    this.accountId = accountId;
  }
}
