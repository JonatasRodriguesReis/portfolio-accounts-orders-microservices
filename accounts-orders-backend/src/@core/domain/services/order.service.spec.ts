import { AccountMemoryRepository } from '../../infra/memory/account-memory.repository';
import { OrderMemoryRepository } from '../../infra/memory/order-memory.repository';
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
    const orderService = new OrderService(
      orderRepository,
      accountStorageService,
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
});
