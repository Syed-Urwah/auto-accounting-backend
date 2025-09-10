import { Injectable } from '@nestjs/common';
import { CreateAccountReceivableDto } from './dto/create-account-receivable.dto';

@Injectable()
export class AccountReceivableService {
  create(createAccountReceivableDto: CreateAccountReceivableDto) {
    // In the future, this will parse the plain English and create an account receivable entry.
    return {
      message: 'This will create an account receivable entry from the following text:',
      text: createAccountReceivableDto.text,
    };
  }
}
