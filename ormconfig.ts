import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/user/user.entity';
import { Company } from './src/company/entities/company.entity';
import { ChartOfAccount } from './src/accounting/entities/chart-of-account.entity';
import { JournalEntry } from './src/accounting/entities/journal-entry.entity';

const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'auto-accounting',
  entities: [User, Company, ChartOfAccount, JournalEntry],
  migrations: [__dirname + '/migrations/**/*.ts'],
  seeds: [__dirname + '/seeders/**/*.ts'],
  factories: ['factories/**/*.ts'],
} as any;

const AppDataSource = new DataSource(options);

export default AppDataSource;
