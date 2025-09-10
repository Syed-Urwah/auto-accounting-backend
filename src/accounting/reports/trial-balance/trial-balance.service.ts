import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { ChartOfAccount } from 'src/accounting/entities/chart-of-account.entity';
import { Repository, LessThanOrEqual } from 'typeorm';

@Injectable()
export class TrialBalanceService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
    @InjectRepository(ChartOfAccount)
    private readonly chartOfAccountRepository: Repository<ChartOfAccount>,
  ) {}

  async generateTrialBalance(asOfDate: string) {
    const accounts = await this.chartOfAccountRepository.find();
    const trialBalance = [];
    let totalDebits = 0;
    let totalCredits = 0;

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

      if (balance !== 0) {
        trialBalance.push({
          accountName: account.accountName,
          debit: balance > 0 ? balance : 0,
          credit: balance < 0 ? Math.abs(balance) : 0,
        });
        totalDebits += balance > 0 ? balance : 0;
        totalCredits += balance < 0 ? Math.abs(balance) : 0;
      }
    }

    return {
      asOfDate,
      trialBalance,
      totalDebits,
      totalCredits,
      isBalanced: totalDebits === totalCredits,
    };
  }
}
