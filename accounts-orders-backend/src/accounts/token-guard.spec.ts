import { Test, TestingModule } from '@nestjs/testing';
import { AccountStorageService } from '../@core/domain/services/account-storage.service';
import { TokenGuard } from './token-guard';

describe('TokenGuard', () => {
  let provider: TokenGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenGuard, AccountStorageService],
    }).compile();

    provider = module.get<TokenGuard>(TokenGuard);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
