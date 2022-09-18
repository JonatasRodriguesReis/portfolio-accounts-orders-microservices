import { OutputOrderDTO, UpdateOrderDTO } from '../dtos/order.dtos';
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  insert(order: Order): Promise<void>;
  findOneById(id: string): Promise<OutputOrderDTO>;
  findAllByAccountId(accountId: string): Promise<OutputOrderDTO[]>;
  update(id: string, updateOrderDTO: UpdateOrderDTO): Promise<OutputOrderDTO>;
  remove(id: string): Promise<OutputOrderDTO>;
}
