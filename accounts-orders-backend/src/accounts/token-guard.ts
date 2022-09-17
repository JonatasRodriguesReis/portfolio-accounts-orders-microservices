import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccountStorageService } from '../@core/domain/services/account-storage.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private accountStorage: AccountStorageService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers?.['x-token'] as string;
    if (token) {
      try {
        await this.accountStorage.setByToken(token);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }

    return false;
  }
}
