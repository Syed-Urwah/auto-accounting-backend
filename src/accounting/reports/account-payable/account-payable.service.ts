import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountPayableService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async getAccountsPayable() {
    const accountsPayableAccount = await this.chartOfAccountRepository.findOne({ where: { accountName: 'Accounts Payable' } });

    if (!accountsPayableAccount) {
      return { message: 'Accounts Payable account not found in Chart of Accounts.' };
    }

    const entries = await this.journalEntryRepository.find({
      where: {
        account: { id: accountsPayableAccount.id },
      },
    });

    // This is a simplified view. In a real system, you'd track individual vendors and invoices.
    return entries.map(entry => ({
      date: entry.date,
      description: entry.description,
      amount: entry.credit - entry.debit, // Payable increases with credit, decreases with debit
    }));
  }
}
