import { Injectable } from '@nestjs/common';
import { CreateTrialBalanceDto } from './dto/create-trial-balance.dto';

@Injectable()
export class TrialBalanceService {
  create(createTrialBalanceDto: CreateTrialBalanceDto) {
    // In the future, this will parse the plain English and create a trial balance.
    return {
      message: 'This will create a trial balance from the following text:',
      text: createTrialBalanceDto.text,
    };
  }
}
