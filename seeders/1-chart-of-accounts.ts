import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { ChartOfAccount } from '../src/accounting/entities/chart-of-account.entity';

export default class ChartOfAccountsSeeder extends Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const chartOfAccounts: Partial<ChartOfAccount>[] = [
      // Assets
      { id: 1, accountNumber: 1000, accountName: 'Cash', accountType: 'Asset' },
      { id: 2, accountNumber: 1010, accountName: 'Accounts Receivable', accountType: 'Asset' },
      { id: 3, accountNumber: 1020, accountName: 'Inventory', accountType: 'Asset' },
      { id: 4, accountNumber: 1030, accountName: 'Prepaid Expenses', accountType: 'Asset' },
      { id: 5, accountNumber: 1040, accountName: 'Fixed Assets', accountType: 'Asset' },
      // Liabilities
      { id: 6, accountNumber: 2000, accountName: 'Accounts Payable', accountType: 'Liability' },
      { id: 7, accountNumber: 2010, accountName: 'Accrued Expenses', accountType: 'Liability' },
      { id: 8, accountNumber: 2020, accountName: 'Unearned Revenue', accountType: 'Liability' },
      { id: 9, accountNumber: 2030, accountName: 'Short-term Loans', accountType: 'Liability' },
      { id: 10, accountNumber: 2040, accountName: 'Long-term Debt', accountType: 'Liability' },
      // Equity
      { id: 11, accountNumber: 3000, accountName: 'Common Stock', accountType: 'Equity' },
      { id: 12, accountNumber: 3010, accountName: 'Retained Earnings', accountType: 'Equity' },
      { id: 13, accountNumber: 3020, accountName: 'Dividends', accountType: 'Equity' },
      // Revenue
      { id: 14, accountNumber: 4000, accountName: 'Sales Revenue', accountType: 'Revenue' },
      { id: 15, accountNumber: 4010, accountName: 'Service Revenue', accountType: 'Revenue' },
      // Expenses
      { id: 16, accountNumber: 5000, accountName: 'Cost of Goods Sold', accountType: 'Expense' },
      { id: 17, accountNumber: 5010, accountName: 'Salaries and Wages', accountType: 'Expense' },
      { id: 18, accountNumber: 5020, accountName: 'Rent Expense', accountType: 'Expense' },
      { id: 19, accountNumber: 5030, accountName: 'Utilities Expense', accountType: 'Expense' },
      { id: 20, accountNumber: 5040, accountName: 'Depreciation Expense', accountType: 'Expense' },
      { id: 21, accountNumber: 5050, accountName: 'Interest Expense', accountType: 'Expense' },
    ];

    await dataSource.getRepository(ChartOfAccount).save(chartOfAccounts);
  }
}

