import { Controller, Get, Query } from '@nestjs/common';
import { IncomeStatementService } from './income-statement.service';

@Controller('accounting/reports/income-statement')
export class IncomeStatementController {
  constructor(private readonly incomeStatementService: IncomeStatementService) {}

  @Get()
  generateIncomeStatement(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.incomeStatementService.generateIncomeStatement(startDate, endDate);
  }
}
