import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountService } from '../@core/domain/services/account.service';
import { AccountRepository } from '../@core/domain/repositories/account.repository';
import { AccountMemoryRepository } from '../@core/infra/memory/account-memory.repository';
import { TokenGuard } from './token-guard';
import { AccountStorageService } from '../@core/domain/services/account-storage.service';

@Module({
  controllers: [AccountsController],
  providers: [
    AccountsService,
    {
      provide: AccountMemoryRepository,
      useFactory: () => {
        return new AccountMemoryRepository();
      },
    },
    {
      provide: AccountService,
      useFactory: (accountRepository: AccountRepository) => {
        return new AccountService(accountRepository);
      },
      inject: [AccountMemoryRepository],
    },
    {
      provide: AccountStorageService,
      useFactory: (accountService: AccountService) => {
        return new AccountStorageService(accountService);
      },
      inject: [AccountService],
    },
    TokenGuard,
  ],
  exports: [AccountStorageService],
})
export class AccountsModule {}
