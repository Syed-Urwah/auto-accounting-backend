import { Controller, Get, Query } from '@nestjs/common';
import { CashFlowStatementService } from './cash-flow-statement.service';

@Controller('accounting/reports/cash-flow-statement')
export class CashFlowStatementController {
  constructor(private readonly cashFlowStatementService: CashFlowStatementService) {}

  @Get()
  generateCashFlowStatement(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.cashFlowStatementService.generateCashFlowStatement(startDate, endDate);
  }
}
