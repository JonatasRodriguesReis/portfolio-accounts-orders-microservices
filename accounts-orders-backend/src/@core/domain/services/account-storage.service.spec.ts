import { AccountMemoryRepository } from '../../infra/db/memory/account-memory.repository';
import { AccountStorageService } from './account-storage.service';
import { AccountService } from './account.service';

describe('Account Storage Service Test', () => {
  it('Should return the correct Account according the given token', async () => {
    const accountRepository = new AccountMemoryRepository();
    const accountService = new AccountService(accountRepository);
    const account = await accountService.create({ name: 'Account test name' });
    console.log(account);
    const accountToken = account.token;
    const accountStorageService = new AccountStorageService(accountService);
    await accountStorageService.setByToken(accountToken);
    const accountFromStorageService = accountStorageService.account;
    expect(accountFromStorageService.id).toBe(account.id);
    expect(accountFromStorageService.name).toBe(account.name);
  });
});
