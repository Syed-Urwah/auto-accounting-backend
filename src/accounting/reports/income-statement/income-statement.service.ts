import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class IncomeStatementService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async generateIncomeStatement(startDate: string, endDate: string) {
    const revenueAccounts = await this.chartOfAccountRepository.find({ where: { accountType: 'Revenue' } });
    const expenseAccounts = await this.chartOfAccountRepository.find({ where: { accountType: 'Expense' } });

    let totalRevenue = 0;
    for (const account of revenueAccounts) {
      const entries = await this.journalEntryRepository.find({
        where: {
          account: { id: account.id },
          date: Between(startDate, endDate),
        },
      });
      totalRevenue += entries.reduce((sum, entry) => sum + (entry.credit - entry.debit), 0);
    }

    let totalExpenses = 0;
    for (const account of expenseAccounts) {
      const entries = await this.journalEntryRepository.find({
        where: {
          account: { id: account.id },
          date: Between(startDate, endDate),
        },
      });
      totalExpenses += entries.reduce((sum, entry) => sum + (entry.debit - entry.credit), 0);
    }

    const netIncome = totalRevenue - totalExpenses;

    return {
      startDate,
      endDate,
      totalRevenue,
      totalExpenses,
      netIncome,
    };
  }
}
