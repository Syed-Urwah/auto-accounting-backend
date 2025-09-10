import { Controller, Post, Body } from '@nestjs/common';
import { TrialBalanceService } from './trial-balance.service';
import { CreateTrialBalanceDto } from './dto/create-trial-balance.dto';

@Controller('accounting/trial-balance')
export class TrialBalanceController {
  constructor(private readonly trialBalanceService: TrialBalanceService) {}

  @Post()
  create(@Body() createTrialBalanceDto: CreateTrialBalanceDto) {
    return this.trialBalanceService.create(createTrialBalanceDto);
  }
}
