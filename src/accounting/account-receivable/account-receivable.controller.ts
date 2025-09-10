import { Controller, Post, Body } from '@nestjs/common';
import { AccountReceivableService } from './account-receivable.service';
import { CreateAccountReceivableDto } from './dto/create-account-receivable.dto';

@Controller('accounting/account-receivable')
export class AccountReceivableController {
  constructor(private readonly accountReceivableService: AccountReceivableService) {}

  @Post()
  create(@Body() createAccountReceivableDto: CreateAccountReceivableDto) {
    return this.accountReceivableService.create(createAccountReceivableDto);
  }
}
