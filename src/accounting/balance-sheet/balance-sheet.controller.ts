import { Controller, Post, Body } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';

@Controller('accounting/balance-sheet')
export class BalanceSheetController {
  constructor(private readonly balanceSheetService: BalanceSheetService) {}

  @Post()
  create(@Body() createBalanceSheetDto: CreateBalanceSheetDto) {
    return this.balanceSheetService.create(createBalanceSheetDto);
  }
}
