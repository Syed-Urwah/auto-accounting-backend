import { Controller, Post, Body } from '@nestjs/common';
import { CashFlowStatementService } from './cash-flow-statement.service';
import { CreateCashFlowStatementDto } from './dto/create-cash-flow-statement.dto';

@Controller('accounting/cash-flow-statement')
export class CashFlowStatementController {
  constructor(private readonly cashFlowStatementService: CashFlowStatementService) {}

  @Post()
  create(@Body() createCashFlowStatementDto: CreateCashFlowStatementDto) {
    return this.cashFlowStatementService.create(createCashFlowStatementDto);
  }
}
