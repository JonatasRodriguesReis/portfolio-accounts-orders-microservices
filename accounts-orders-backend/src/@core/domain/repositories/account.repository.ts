import { UpdateAccountDTO } from '../dtos/account.dtos';
import { Account } from '../entities/account.entity';

export interface AccountRepository {
  insert(account: Account): Promise<void>;
  findOneById(id: string): Promise<Account>;
  findOneByToken(token: string): Promise<Account>;
  findAll(): Promise<Account[]>;
  update(id: string, updateAccountDTO: UpdateAccountDTO): Promise<Account>;
  remove(id: string): Promise<Account>;
}
