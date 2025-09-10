import { Module } from '@nestjs/common';
import { AccountPayableController } from './account-payable.controller';
import { AccountPayableService } from './account-payable.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ChartOfAccount])],
  controllers: [AccountPayableController],
  providers: [AccountPayableService],
})
export class AccountPayableModule {}
