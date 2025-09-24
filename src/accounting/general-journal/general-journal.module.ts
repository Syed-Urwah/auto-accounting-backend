import { Module } from '@nestjs/common';
import { GeneralJournalService } from './general-journal.service';
import { GeneralJournalController } from './general-journal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { ConfigModule } from '@nestjs/config';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, ChartOfAccount, Company]), ConfigModule],
  controllers: [GeneralJournalController],
  providers: [GeneralJournalService],
})
export class GeneralJournalModule {}
