import { Controller, Get } from '@nestjs/common';
import { AccountPayableService } from './account-payable.service';

@Controller('accounting/reports/account-payable')
export class AccountPayableController {
  constructor(private readonly accountPayableService: AccountPayableService) {}

  @Get()
  getAccountsPayable() {
    return this.accountPayableService.getAccountsPayable();
  }
}
