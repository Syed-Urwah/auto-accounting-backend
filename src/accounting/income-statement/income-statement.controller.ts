import { Controller, Post, Body } from '@nestjs/common';
import { IncomeStatementService } from './income-statement.service';
import { CreateIncomeStatementDto } from './dto/create-income-statement.dto';

@Controller('accounting/income-statement')
export class IncomeStatementController {
  constructor(private readonly incomeStatementService: IncomeStatementService) {}

  @Post()
  create(@Body() createIncomeStatementDto: CreateIncomeStatementDto) {
    return this.incomeStatementService.create(createIncomeStatementDto);
  }
}
