import { UpdateOrderDTO } from '../dtos/order.dtos';
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  insert(order: Order): Promise<void>;
  findOneById(id: string): Promise<Order>;
  findAllByAccountId(accountId: string): Promise<Order[]>;
  update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<Order>;
  remove(id: string): Promise<Order>;
}
