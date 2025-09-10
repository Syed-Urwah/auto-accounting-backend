import { Injectable } from '@nestjs/common';
import { CreateIncomeStatementDto } from './dto/create-income-statement.dto';

@Injectable()
export class IncomeStatementService {
  create(createIncomeStatementDto: CreateIncomeStatementDto) {
    // In the future, this will parse the plain English and create an income statement.
    return {
      message: 'This will create an income statement from the following text:',
      text: createIncomeStatementDto.text,
    };
  }
}
