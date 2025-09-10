import { Module } from '@nestjs/common';
import { AccountReceivableController } from './account-receivable.controller';
import { AccountReceivableService } from './account-receivable.service';

@Module({
  controllers: [AccountReceivableController],
  providers: [AccountReceivableService]
})
export class AccountReceivableModule {}
