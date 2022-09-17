import { Order, OrderStatus } from './order.entity';

describe('Order entity', () => {
  it('Should create a new order entity', () => {
    const order = new Order(
      200,
      '123123',
      'teste 123',
      //OrderStatus.Approved,
      '321321',
      '1',
    );
    expect(order.amount).toBe(200);
    expect(order.creditCardNumber).toBe('123123');
    expect(order.creditCardName).toBe('teste 123');
    expect(order.status).toBe(OrderStatus.Pending);
    expect(order.accountId).toBe('321321');
    expect(order.id).toBe('1');
  });
});
