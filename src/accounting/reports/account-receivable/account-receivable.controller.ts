import { Controller, Get } from '@nestjs/common';
import { AccountReceivableService } from './account-receivable.service';

@Controller('accounting/reports/account-receivable')
export class AccountReceivableController {
  constructor(private readonly accountReceivableService: AccountReceivableService) {}

  @Get()
  getAccountsReceivable() {
    return this.accountReceivableService.getAccountsReceivable();
  }
}
