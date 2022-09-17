import { UpdateAccountDTO } from '../../../domain/dtos/account.dtos';
import { Account } from '../../../domain/entities/account.entity';
import { AccountRepository } from '../../../domain/repositories/account.repository';

export class AccountMemoryRepository implements AccountRepository {
  private _accounts: Account[];

  constructor() {
    this._accounts = [];
  }
  async findOneByToken(token: string): Promise<Account> {
    const findAccount = this._accounts.find(
      (account) => account.token === token,
    );
    if (!findAccount) throw new Error('Account not found!');
    return findAccount;
  }
  async findAll(): Promise<Account[]> {
    return this._accounts;
  }
  async insert(account: Account): Promise<void> {
    this._accounts.push(account);
  }
  async findOneById(id: string): Promise<Account> {
    const findAccount = this._accounts.find((account) => account.id === id);
    if (!findAccount) throw new Error('Account not found!');
    return findAccount;
  }
  async update(
    id: string,
    { name, token }: UpdateAccountDTO,
  ): Promise<Account> {
    const findAccountIndex = this._accounts.findIndex(
      (account) => account.id === id,
    );
    if (findAccountIndex === -1) throw new Error('Account not found!');
    const orderAccountId = this._accounts[findAccountIndex].id;
    this._accounts[findAccountIndex] = new Account(name, orderAccountId);
    return this._accounts[findAccountIndex];
  }
  async remove(id: string): Promise<Account> {
    const findAccountIndex = this._accounts.findIndex(
      (account) => account.id === id,
    );
    if (findAccountIndex === -1) throw new Error('Account not found!');
    const account = this._accounts[findAccountIndex];
    this._accounts.splice(findAccountIndex, 1);
    return account;
  }
}
