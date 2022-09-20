import {
  OutputOrderDTO,
  UpdateOrderDTO,
} from '../../../domain/dtos/order.dtos';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { Repository } from 'typeorm';
import { OrderSchema } from './order-schema';
import { Account } from 'src/accounts/entities/account.entity';
import { AccountSchema } from './account-schema';

export class OrderTypeOrmRepository implements OrderRepository {
  constructor(
    private ormOrderRepository: Repository<OrderSchema>,
    private ormAccountRepository: Repository<AccountSchema>,
  ) {}

  async insert(order: Order): Promise<void> {
    const account: AccountSchema = await this.ormAccountRepository.findOneBy({
      id: order.accountId,
    });
    const model = this.ormOrderRepository.create({ ...order, account });
    await this.ormOrderRepository.insert(model);
  }
  async findOneById(id: string): Promise<OutputOrderDTO> {
    const response = await this.ormOrderRepository.find({
      where: { id },
      relations: { account: true },
    });
    const findOrder = response[0];
    if (!findOrder) throw new Error('Order not found!');
    const order: OutputOrderDTO = {
      amount: findOrder.amount,
      creditCardNumber: findOrder.creditCardNumber,
      creditCardName: findOrder.creditCardName,
      accountId: findOrder.accountId,
      account: findOrder.account,
      status: findOrder.status,
      id: findOrder.id,
    };
    return order;
  }
  async findAllByAccountId(accountId: string): Promise<OutputOrderDTO[]> {
    const findOrders = await this.ormOrderRepository.find({
      where: { accountId },
      relations: { account: true },
    });
    if (!findOrders.length)
      throw new Error('There are not orders with accountId given!');
    const orders: OutputOrderDTO[] = findOrders.map((findOrder) => ({
      amount: findOrder.amount,
      creditCardNumber: findOrder.creditCardNumber,
      creditCardName: findOrder.creditCardName,
      accountId: findOrder.accountId,
      account: findOrder.account,
      status: findOrder.status,
      id: findOrder.id,
    }));
    return orders;
  }
  async update(
    id: string,
    { amount, creditCardName, creditCardNumber, status }: UpdateOrderDTO,
  ): Promise<OutputOrderDTO> {
    const response = await this.ormOrderRepository.find({
      where: { id },
      relations: { account: true },
    });
    const findOrder = response[0];
    if (!findOrder) throw new Error('Order not found!');
    await this.ormOrderRepository.update(id, {
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
      account: findOrder.account,
      status: findOrder.status,
      id: findOrder.id,
    };
    return order;
  }
  async remove(id: string): Promise<OutputOrderDTO> {
    const response = await this.ormOrderRepository.find({
      where: { id },
      relations: { account: true },
    });
    const findOrder = response[0];
    if (!findOrder) throw new Error('Order not found!');
    await this.ormOrderRepository.remove(findOrder);
    const order: OutputOrderDTO = {
      amount: findOrder.amount,
      creditCardNumber: findOrder.creditCardNumber,
      creditCardName: findOrder.creditCardName,
      accountId: findOrder.accountId,
      account: findOrder.account,
      status: findOrder.status,
      id: findOrder.id,
    };
    return order;
  }
}
