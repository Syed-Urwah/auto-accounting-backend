import { Controller, Get, Query } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';

@Controller('accounting/reports/balance-sheet')
export class BalanceSheetController {
  constructor(private readonly balanceSheetService: BalanceSheetService) {}

  @Get()
  generateBalanceSheet(@Query('asOfDate') asOfDate: string) {
    return this.balanceSheetService.generateBalanceSheet(asOfDate);
  }
}
