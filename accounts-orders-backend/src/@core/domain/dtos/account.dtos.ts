import { Order } from '../entities/order.entity';

export interface CreateAccountDTO {
  name: string;
}

export interface OutputAccountDTO {
  id: string;
  name: string;
  token: string;
  orders?: Order[];
}

export interface UpdateAccountDTO {
  name?: string;
  token?: string;
}
