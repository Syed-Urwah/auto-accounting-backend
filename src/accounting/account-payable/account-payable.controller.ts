import { Controller, Post, Body } from '@nestjs/common';
import { AccountPayableService } from './account-payable.service';
import { CreateAccountPayableDto } from './dto/create-account-payable.dto';

@Controller('accounting/account-payable')
export class AccountPayableController {
  constructor(private readonly accountPayableService: AccountPayableService) {}

  @Post()
  create(@Body() createAccountPayableDto: CreateAccountPayableDto) {
    return this.accountPayableService.create(createAccountPayableDto);
  }
}
