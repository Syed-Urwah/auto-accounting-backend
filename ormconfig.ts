import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';
import { Company } from './src/company/entities/company.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'auto-accounting',
  entities: [User, Company],
  migrations: [__dirname + '/migrations/**/*.ts'],
});

export default AppDataSource;
