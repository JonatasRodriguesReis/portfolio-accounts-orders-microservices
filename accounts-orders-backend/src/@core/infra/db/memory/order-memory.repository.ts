import { UpdateOrderDTO } from '../../../domain/dtos/order.dtos';
import { Order } from '../../../domain/entities/order.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';

export class OrderMemoryRepository implements OrderRepository {
  private _orders: Order[];

  constructor() {
    this._orders = [];
  }

  async insert(order: Order): Promise<void> {
    this._orders.push(order);
  }
  async findOneById(id: string): Promise<Order> {
    const findOrder = this._orders.find((order) => order.id === id);
    if (!findOrder) throw new Error('Order not found!');
    return findOrder;
  }
  async findAllByAccountId(accountId: string): Promise<Order[]> {
    const findOrders = this._orders.filter(
      (order) => order.accountId === accountId,
    );
    if (!findOrders.length)
      throw new Error('There are not orders with accountId given!');
    return findOrders;
  }
  async update(
    id: string,
    { amount, creditCardName, creditCardNumber, status }: UpdateOrderDTO,
  ): Promise<Order> {
    const findOrderIndex = this._orders.findIndex((order) => order.id === id);
    if (findOrderIndex === -1) throw new Error('Order not found!');
    const orderAccountId = this._orders[findOrderIndex].accountId;
    this._orders[findOrderIndex] = new Order(
      amount,
      creditCardNumber,
      creditCardName,
      orderAccountId,
      id,
    );
    return this._orders[findOrderIndex];
  }
  async remove(id: string): Promise<Order> {
    const findOrderIndex = this._orders.findIndex((order) => order.id === id);
    if (findOrderIndex === -1) throw new Error('Order not found!');
    const order = this._orders[findOrderIndex];
    this._orders.splice(findOrderIndex, 1);
    return order;
  }
}
