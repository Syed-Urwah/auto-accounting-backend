import { Module } from '@nestjs/common';
import { AccountPayableController } from './account-payable.controller';
import { AccountPayableService } from './account-payable.service';

@Module({
  controllers: [AccountPayableController],
  providers: [AccountPayableService]
})
export class AccountPayableModule {}
