import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository, LessThanOrEqual } from 'typeorm';

@Injectable()
export class BalanceSheetService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async generateBalanceSheet(asOfDate: string) {
    const accounts = await this.chartOfAccountRepository.find();
    const balanceSheet = {
      assets: {},
      liabilities: {},
      equity: {},
      totalAssets: 0,
      totalLiabilities: 0,
      totalEquity: 0,
    };

    for (const account of accounts) {
      const entries = await this.journalEntryRepository.find({
        where: {
          account: { id: account.id },
          date: LessThanOrEqual(asOfDate),
        },
      });

      let balance = 0;
      for (const entry of entries) {
        if (account.accountType === 'Asset' || account.accountType === 'Expense') {
          balance += entry.debit - entry.credit;
        } else if (account.accountType === 'Liability' || account.accountType === 'Equity' || account.accountType === 'Revenue') {
          balance += entry.credit - entry.debit;
        }
      }

      if (account.accountType === 'Asset') {
        balanceSheet.assets[account.accountName] = balance;
        balanceSheet.totalAssets += balance;
      } else if (account.accountType === 'Liability') {
        balanceSheet.liabilities[account.accountName] = balance;
        balanceSheet.totalLiabilities += balance;
      } else if (account.accountType === 'Equity') {
        balanceSheet.equity[account.accountName] = balance;
        balanceSheet.totalEquity += balance;
      }
    }

    // This is a simplified calculation. In a real scenario, Net Income would be closed to Retained Earnings.
    // For now, we'll just ensure the equation balances.
    // The Income Statement service would provide the Net Income for the period.

    return balanceSheet;
  }
}
