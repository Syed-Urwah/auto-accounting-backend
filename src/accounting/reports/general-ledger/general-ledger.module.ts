import { Module } from '@nestjs/common';
import { GeneralLedgerController } from './general-ledger.controller';
import { GeneralLedgerService } from './general-ledger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ChartOfAccount])],
  controllers: [GeneralLedgerController],
  providers: [GeneralLedgerService],
})
export class GeneralLedgerModule {}

