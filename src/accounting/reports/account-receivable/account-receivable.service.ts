import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountReceivableService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async getAccountsReceivable() {
    const accountsReceivableAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Accounts Receivable' } });

    if (!accountsReceivableAccount) {
      return { message: 'Accounts Receivable account not found in Chart of Accounts.' };
    }

    const entries = await this.journalEntryRepository.find({
      where: {
        account: { id: accountsReceivableAccount.id },
      },
    });

    // This is a simplified view. In a real system, you'd track individual customers and invoices.
    return entries.map(entry => ({
      date: entry.date,
      description: entry.description,
      amount: entry.debit - entry.credit, // Receivable increases with debit, decreases with credit
    }));
  }
}
