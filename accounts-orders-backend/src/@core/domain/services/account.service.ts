import {
  CreateAccountDTO,
  OutputAccountDTO,
  UpdateAccountDTO,
} from '../dtos/account.dtos';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';

export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async create({ name }: CreateAccountDTO): Promise<Account> {
    const account = new Account(name);
    await this.accountRepository.insert(account);
    return account;
  }

  async findAll(): Promise<OutputAccountDTO[]> {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }

  async findOneById(id: string): Promise<OutputAccountDTO> {
    const account = await this.accountRepository.findOneById(id);
    return account;
  }

  async findOneByToken(token: string): Promise<OutputAccountDTO> {
    const account = await this.accountRepository.findOneByToken(token);
    return account;
  }

  async updateAccount(
    id: string,
    updateAccountDTO: UpdateAccountDTO,
  ): Promise<OutputAccountDTO> {
    const Account = await this.accountRepository.update(id, updateAccountDTO);
    return Account;
  }

  async removeAccount(id: string): Promise<OutputAccountDTO> {
    const removedAccount = await this.accountRepository.remove(id);
    return removedAccount;
  }
}
