import { Injectable } from '@nestjs/common';
import { CreateCashFlowStatementDto } from './dto/create-cash-flow-statement.dto';

@Injectable()
export class CashFlowStatementService {
  create(createCashFlowStatementDto: CreateCashFlowStatementDto) {
    // In the future, this will parse the plain English and create a cash flow statement.
    return {
      message: 'This will create a cash flow statement from the following text:',
      text: createCashFlowStatementDto.text,
    };
  }
}
