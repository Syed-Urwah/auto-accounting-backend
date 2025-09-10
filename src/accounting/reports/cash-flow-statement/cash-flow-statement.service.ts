import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class CashFlowStatementService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async generateCashFlowStatement(startDate: string, endDate: string) {
    const cashAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Cash' } });

    if (!cashAccount) {
      return { message: 'Cash account not found in Chart of Accounts.' };
    }

    const cashEntries = await this.journalEntryRepository.find({
      where: {
        account: { id: cashAccount.id },
        date: Between(startDate, endDate),
      },
    });

    let operatingActivities = 0;
    let investingActivities = 0;
    let financingActivities = 0;

    // Simplified logic: This needs significant expansion for a real cash flow statement.
    // For demonstration, we'll categorize based on common cash movements.
    for (const entry of cashEntries) {
      // Example: Cash received from customers (operating)
      if (entry.description.toLowerCase().includes('received from') || entry.description.toLowerCase().includes('sales')) {
        operatingActivities += entry.debit - entry.credit;
      }
      // Example: Cash paid for expenses (operating)
      else if (entry.description.toLowerCase().includes('paid for') || entry.description.toLowerCase().includes('expense')) {
        operatingActivities += entry.credit - entry.debit;
      }
      // Example: Cash used to buy assets (investing)
      else if (entry.description.toLowerCase().includes('purchased asset') || entry.description.toLowerCase().includes('bought equipment')) {
        investingActivities += entry.credit - entry.debit;
      }
      // Example: Cash from issuing debt/equity (financing)
      else if (entry.description.toLowerCase().includes('loan received') || entry.description.toLowerCase().includes('issued shares')) {
        financingActivities += entry.debit - entry.credit;
      }
      // Example: Cash paid for dividends/loan repayment (financing)
      else if (entry.description.toLowerCase().includes('paid dividend') || entry.description.toLowerCase().includes('loan repayment')) {
        financingActivities += entry.credit - entry.debit;
      }
    }

    const netIncreaseDecreaseInCash = operatingActivities + investingActivities + financingActivities;

    return {
      startDate,
      endDate,
      operatingActivities,
      investingActivities,
      financingActivities,
      netIncreaseDecreaseInCash,
    };
  }
}
