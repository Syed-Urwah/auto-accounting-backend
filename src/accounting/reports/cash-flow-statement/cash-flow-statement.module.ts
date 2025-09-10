import { Module } from '@nestjs/common';
import { CashFlowStatementController } from './cash-flow-statement.controller';
import { CashFlowStatementService } from './cash-flow-statement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ChartOfAccount])],
  controllers: [CashFlowStatementController],
  providers: [CashFlowStatementService],
})
export class CashFlowStatementModule {}

