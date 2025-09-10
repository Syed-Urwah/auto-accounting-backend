import { Module } from '@nestjs/common';
import { IncomeStatementController } from './income-statement.controller';
import { IncomeStatementService } from './income-statement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ChartOfAccount])],
  controllers: [IncomeStatementController],
  providers: [IncomeStatementService],
})
export class IncomeStatementModule {}

