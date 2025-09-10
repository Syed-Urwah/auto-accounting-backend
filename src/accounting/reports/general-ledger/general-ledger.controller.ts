import { Controller, Get, Param } from '@nestjs/common';
import { GeneralLedgerService } from './general-ledger.service';

@Controller('accounting/reports/general-ledger')
export class GeneralLedgerController {
  constructor(private readonly generalLedgerService: GeneralLedgerService) {}

  @Get(':accountId')
  findAll(@Param('accountId') accountId: string) {
    return this.generalLedgerService.findAll(+accountId);
  }
}

