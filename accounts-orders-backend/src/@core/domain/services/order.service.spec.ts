import { EventStreamMemoryRepository } from '../../infra/event-stream/memory/event-stream-memory.repository';
import { AccountMemoryRepository } from '../../infra/db/memory/account-memory.repository';
import { OrderMemoryRepository } from '../../infra/db/memory/order-memory.repository';
import { Order, OrderStatus } from '../entities/order.entity';
import { AccountStorageService } from './account-storage.service';
import { AccountService } from './account.service';
import { OrderService } from './order.service';

describe('Order Service test', () => {
  let accountStorageService: AccountStorageService;
  beforeEach(async () => {
    const accountRepository = new AccountMemoryRepository();
    const accountService = new AccountService(accountRepository);
    const account = await accountService.create({ name: 'Account test name' });
    const accountToken = account.token;
    accountStorageService = new AccountStorageService(accountService);
    await accountStorageService.setByToken(accountToken);
  });

  it('Should be able to create a order', async () => {
    const orderRepository = new OrderMemoryRepository();
    const eventStreamMemoryRepository = new EventStreamMemoryRepository();
    const orderService = new OrderService(
      orderRepository,
      accountStorageService,
      eventStreamMemoryRepository,
    );
    const order = await orderService.create({
      amount: 200,
      creditCardNumber: '123123',
      creditCardName: 'teste 123',
    });
    expect(order.amount).toBe(200);
    expect(order.creditCardNumber).toBe('123123');
    expect(order.creditCardName).toBe('teste 123');
    expect(order.status).toBe(OrderStatus.Pending);
    expect(order.accountId).toBe(accountStorageService.account.id);
  });

  it('Should be able to call publish event in stream service on creation the order', async () => {
    const orderRepository = new OrderMemoryRepository();
    const eventStreamMemoryRepository = new EventStreamMemoryRepository();
    const orderService = new OrderService(
      orderRepository,
      accountStorageService,
      eventStreamMemoryRepository,
    );
    const spy = jest.spyOn(eventStreamMemoryRepository, 'publish');
    const amount = 200;
    const creditCardNumber = '123123';
    const creditCardName = 'teste 123';
    const order = await orderService.create({
      amount,
      creditCardNumber,
      creditCardName,
    });
    expect(spy).toHaveBeenCalledWith({
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
    expect(order.amount).toBe(200);
  });
});
