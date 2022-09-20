import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';

export class Account {
  readonly id: string;
  readonly name: string;
  readonly token: string;
  readonly orders?: Order[];

  constructor(name: string, id?: string) {
    this.id = id ?? uuid();
    this.name = name;
    this.token = Math.random().toString(36).slice(2);
    this.orders = [];
  }
}
