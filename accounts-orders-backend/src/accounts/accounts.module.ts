import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountService } from '../@core/domain/services/account.service';
import { AccountRepository } from '../@core/domain/repositories/account.repository';
import { AccountMemoryRepository } from '../@core/infra/db/memory/account-memory.repository';
import { TokenGuard } from './token-guard';
import { AccountStorageService } from '../@core/domain/services/account-storage.service';
import { AccountTypeOrmRepository } from 'src/@core/infra/db/typeorm/account-typeorm.repository';
import { DataSource } from 'typeorm';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { AccountSchema } from 'src/@core/infra/db/typeorm/account-schema';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSchema])],
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
      provide: AccountTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new AccountTypeOrmRepository(
          dataSource.getRepository(AccountSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: AccountService,
      useFactory: (accountRepository: AccountRepository) => {
        return new AccountService(accountRepository);
      },
      inject: [AccountTypeOrmRepository],
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
