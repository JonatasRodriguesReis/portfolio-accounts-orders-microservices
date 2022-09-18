import {
  OutputOrderDTO,
  UpdateOrderDTO,
} from '../../../domain/dtos/order.dtos';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { Repository } from 'typeorm';
import { OrderSchema } from './order-schema';

export class OrderMemoryRepository implements OrderRepository {
  constructor(private ormRepository: Repository<OrderSchema>) {}

  async insert(order: Order): Promise<void> {
    const model = this.ormRepository.create(order);
    await this.ormRepository.insert(model);
  }
  async findOneById(id: string): Promise<OutputOrderDTO> {
    const findOrder = await this.ormRepository.findOneBy({ id });
    if (!findOrder) throw new Error('Order not found!');
    const order: OutputOrderDTO = {
      amount: findOrder.amount,
      creditCardNumber: findOrder.creditCardNumber,
      creditCardName: findOrder.creditCardName,
      accountId: findOrder.accountId,
      status: findOrder.status,
      id: findOrder.id,
    };
    return order;
  }
  async findAllByAccountId(accountId: string): Promise<OutputOrderDTO[]> {
    const findOrders = await this.ormRepository.findBy({ accountId });
    if (!findOrders.length)
      throw new Error('There are not orders with accountId given!');
    const orders: OutputOrderDTO[] = findOrders.map((findOrder) => ({
      amount: findOrder.amount,
      creditCardNumber: findOrder.creditCardNumber,
      creditCardName: findOrder.creditCardName,
      accountId: findOrder.accountId,
      status: findOrder.status,
      id: findOrder.id,
    }));
    return orders;
  }
  async update(
    id: string,
    { amount, creditCardName, creditCardNumber, status }: UpdateOrderDTO,
  ): Promise<OutputOrderDTO> {
    const findOrder = await this.ormRepository.findOneBy({ id });
    if (!findOrder) throw new Error('Order not found!');
    await this.ormRepository.update(id, {
      amount,
      creditCardName,
      creditCardNumber,
      status,
    });
    const order: OutputOrderDTO = {
      amount,
      creditCardNumber,
      creditCardName,
      accountId: findOrder.accountId,
      status: findOrder.status,
      id: findOrder.id,
    };
    return order;
  }
  async remove(id: string): Promise<OutputOrderDTO> {
    const findOrder = await this.ormRepository.findOneBy({ id });
    if (!findOrder) throw new Error('Order not found!');
    await this.ormRepository.remove(findOrder);
    const order: OutputOrderDTO = {
      amount: findOrder.amount,
      creditCardNumber: findOrder.creditCardNumber,
      creditCardName: findOrder.creditCardName,
      accountId: findOrder.accountId,
      status: findOrder.status,
      id: findOrder.id,
    };
    return order;
  }
}
