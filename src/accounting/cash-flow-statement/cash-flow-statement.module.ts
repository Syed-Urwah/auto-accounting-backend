import { Module } from '@nestjs/common';
import { CashFlowStatementController } from './cash-flow-statement.controller';
import { CashFlowStatementService } from './cash-flow-statement.service';

@Module({
  controllers: [CashFlowStatementController],
  providers: [CashFlowStatementService]
})
export class CashFlowStatementModule {}
