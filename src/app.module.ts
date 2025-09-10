import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { OcrModule } from './ocr/ocr.module';
import { GeneralJournalModule } from './accounting/general-journal/general-journal.module';
import { GeneralJournalController } from './accounting/general-journal/general-journal.controller';
import { GeneralJournalService } from './accounting/general-journal/general-journal.service';
import { GeneralLedgerModule } from './accounting/general-ledger/general-ledger.module';
import { IncomeStatementModule } from './accounting/income-statement/income-statement.module';
import { BalanceSheetModule } from './accounting/balance-sheet/balance-sheet.module';
import { TrialBalanceModule } from './accounting/trial-balance/trial-balance.module';
import { AccountPayableModule } from './accounting/account-payable/account-payable.module';
import { AccountReceivableModule } from './accounting/account-receivable/account-receivable.module';
import { CashFlowStatementModule } from './accounting/cash-flow-statement/cash-flow-statement.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'auto-accounting',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    UserModule,
    CompanyModule,
    OcrModule,
    GeneralJournalModule,
    GeneralLedgerModule,
    IncomeStatementModule,
    BalanceSheetModule,
    TrialBalanceModule,
    AccountPayableModule,
    AccountReceivableModule,
    CashFlowStatementModule,
  ],
  controllers: [AppController, GeneralJournalController],
  providers: [AppService, GeneralJournalService],
})
export class AppModule {}
