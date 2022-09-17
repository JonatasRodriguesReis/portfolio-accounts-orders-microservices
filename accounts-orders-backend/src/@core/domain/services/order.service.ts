import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/order.dtos';
import { Order } from '../entities/order.entity';
import { EventStreamRepository } from '../repositories/event-stream.repository';
import { OrderRepository } from '../repositories/order.repository';
import { AccountStorageService } from './account-storage.service';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private accountStorage: AccountStorageService,
    private eventStream: EventStreamRepository,
  ) {}

  async create({
    amount,
    creditCardName,
    creditCardNumber,
  }: CreateOrderDTO): Promise<Order> {
    const accountId = this.accountStorage.account.id;
    const order = new Order(
      amount,
      creditCardNumber,
      creditCardName,
      accountId,
    );
    await this.orderRepository.insert(order);
    await this.eventStream.publish({
      topic: 'transactions',
      messages: [
        {
          key: 'transactions',
          value: JSON.stringify({
            id: order.id,
            accountId: order.accountId,
            status: order.status,
            amount,
            creditCardName,
            creditCardNumber,
          }),
        },
      ],
    });

    return order;
  }

  async findAllByAccountId(): Promise<Order[]> {
    const accountId = this.accountStorage.account.id;
    const orders = await this.orderRepository.findAllByAccountId(accountId);
    return orders;
  }

  async findOneById(id): Promise<Order> {
    const order = await this.orderRepository.findOneById(id);
    return order;
  }

  async updateOrder(
    id: string,
    updateOrderDTO: UpdateOrderDTO,
  ): Promise<Order> {
    const order = await this.orderRepository.update(id, updateOrderDTO);
    return order;
  }

  async removeOrder(id: string) {
    const removedOrder = await this.orderRepository.remove(id);
    return removedOrder;
  }
}
