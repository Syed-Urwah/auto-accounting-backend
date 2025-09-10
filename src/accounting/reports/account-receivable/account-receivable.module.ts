import { Module } from '@nestjs/common';
import { AccountReceivableController } from './account-receivable.controller';
import { AccountReceivableService } from './account-receivable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ChartOfAccount])],
  controllers: [AccountReceivableController],
  providers: [AccountReceivableService],
})
export class AccountReceivableModule {}

