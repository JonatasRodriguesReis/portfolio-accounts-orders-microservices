import { Account } from '../entities/account.entity';
import { AccountService } from './account.service';

export class AccountStorageService {
  private _account: Account;

  constructor(private accountService: AccountService) {}

  get account() {
    return this._account;
  }

  async setByToken(token: string) {
    const findAccount = await this.accountService.findOneByToken(token);
    /**TODO: Define the responsible for error generating */
    if (!findAccount) throw new Error('Account not found!');
    this._account = findAccount;
  }
}
