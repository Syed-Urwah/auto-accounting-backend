import { Controller, Get, Query } from '@nestjs/common';
import { TrialBalanceService } from './trial-balance.service';

@Controller('accounting/reports/trial-balance')
export class TrialBalanceController {
  constructor(private readonly trialBalanceService: TrialBalanceService) {}

  @Get()
  generateTrialBalance(@Query('asOfDate') asOfDate: string) {
    return this.trialBalanceService.generateTrialBalance(asOfDate);
  }
}
