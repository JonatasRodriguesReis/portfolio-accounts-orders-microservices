import { OutputAccountDTO, UpdateAccountDTO } from '../dtos/account.dtos';
import { Account } from '../entities/account.entity';

export interface AccountRepository {
  insert(account: Account): Promise<void>;
  findOneById(id: string): Promise<OutputAccountDTO>;
  findOneByToken(token: string): Promise<OutputAccountDTO>;
  findAll(): Promise<OutputAccountDTO[]>;
  update(
    id: string,
    updateAccountDTO: UpdateAccountDTO,
  ): Promise<OutputAccountDTO>;
  remove(id: string): Promise<OutputAccountDTO>;
}
