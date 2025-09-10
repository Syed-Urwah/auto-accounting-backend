import { Controller, Post, Body } from '@nestjs/common';
import { GeneralLedgerService } from './general-ledger.service';
import { CreateGeneralLedgerDto } from './dto/create-general-ledger.dto';

@Controller('accounting/general-ledger')
export class GeneralLedgerController {
  constructor(private readonly generalLedgerService: GeneralLedgerService) {}

  @Post()
  create(@Body() createGeneralLedgerDto: CreateGeneralLedgerDto) {
    return this.generalLedgerService.create(createGeneralLedgerDto);
  }
}
