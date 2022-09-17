import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountService } from '../@core/domain/services/account.service';
import {
  CreateAccountDTO,
  UpdateAccountDTO,
} from '../@core/domain/dtos/account.dtos';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDTO) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDTO) {
    return this.accountsService.updateAccount(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.removeAccount(id);
  }
}
