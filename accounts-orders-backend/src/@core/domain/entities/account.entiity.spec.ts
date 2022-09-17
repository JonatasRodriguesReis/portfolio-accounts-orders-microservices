import { Account } from './account.entity';

describe('Account entity', () => {
  it('Should be able to create a new account', () => {
    const account = new Account('account', '1');
    expect(account.id).toBe('1');
    expect(account.name).toBe('account');
    /**
     * TODO: Mock of token generate
     * expect(account.token).toBe('token_account');
     * */
  });
});
