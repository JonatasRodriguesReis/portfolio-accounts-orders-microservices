import { AccountMemoryRepository } from '../../infra/db/memory/account-memory.repository';
import { AccountService } from './account.service';

describe('Account Service test', () => {
  it('Should be able to create an account', async () => {
    const accountRepository = new AccountMemoryRepository();
    const accountService = new AccountService(accountRepository);
    const account = await accountService.create({
      name: 'account',
    });
    expect(account.name).toBe('account');
  });
});
