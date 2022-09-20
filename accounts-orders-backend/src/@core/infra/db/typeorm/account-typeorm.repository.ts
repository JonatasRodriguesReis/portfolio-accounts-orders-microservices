import {
  OutputAccountDTO,
  UpdateAccountDTO,
} from '../../../domain/dtos/account.dtos';
import { Account } from '../../../domain/entities/account.entity';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { Repository } from 'typeorm';
import { AccountSchema } from './account-schema';
import { find } from 'rxjs';

export class AccountTypeOrmRepository implements AccountRepository {
  constructor(private ormRepository: Repository<AccountSchema>) {}
  async findOneByToken(token: string): Promise<OutputAccountDTO> {
    const response = await this.ormRepository.find({
      where: { token },
      relations: { orders: true },
    });
    const findAccount = response[0];
    if (!findAccount) throw new Error('Account not found!');
    const account: OutputAccountDTO = {
      name: findAccount.name,
      id: findAccount.id,
      token: findAccount.token,
      orders: findAccount.orders,
    };
    return account;
  }
  async findAll(): Promise<OutputAccountDTO[]> {
    const findAccounts = await this.ormRepository.find({
      relations: { orders: true },
    });
    const accounts: OutputAccountDTO[] = findAccounts.map((findAccount) => ({
      name: findAccount.name,
      id: findAccount.id,
      token: findAccount.token,
      orders: findAccount.orders,
    }));
    return accounts;
  }
  async insert(account: Account): Promise<void> {
    const model = this.ormRepository.create(account);
    await this.ormRepository.insert(model);
  }
  async findOneById(id: string): Promise<OutputAccountDTO> {
    const response = await this.ormRepository.find({
      where: { id },
      relations: { orders: true },
    });
    const findAccount = response[0];
    if (!findAccount) throw new Error('Account not found!');
    const account: OutputAccountDTO = {
      name: findAccount.name,
      id: findAccount.id,
      token: findAccount.token,
      orders: findAccount.orders,
    };
    return account;
  }
  async update(
    id: string,
    { name, token }: UpdateAccountDTO,
  ): Promise<OutputAccountDTO> {
    const response = await this.ormRepository.find({
      where: { id },
      relations: { orders: true },
    });
    const findAccount = response[0];
    if (!findAccount) throw new Error('Account not found!');
    await this.ormRepository.update(id, {
      name,
    });
    const account: OutputAccountDTO = {
      name,
      id: findAccount.id,
      token,
      orders: findAccount.orders,
    };
    return account;
  }
  async remove(id: string): Promise<OutputAccountDTO> {
    const response = await this.ormRepository.find({
      where: { id },
      relations: { orders: true },
    });
    const findAccount = response[0];
    if (!findAccount) throw new Error('Account not found!');
    await this.ormRepository.remove(findAccount);
    const account: OutputAccountDTO = {
      name: findAccount.name,
      id: findAccount.id,
      token: findAccount.token,
      orders: findAccount.orders,
    };
    return account;
  }
}
