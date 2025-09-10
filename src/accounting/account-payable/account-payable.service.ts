import { Injectable } from '@nestjs/common';
import { CreateAccountPayableDto } from './dto/create-account-payable.dto';

@Injectable()
export class AccountPayableService {
  create(createAccountPayableDto: CreateAccountPayableDto) {
    // In the future, this will parse the plain English and create an account payable entry.
    return {
      message: 'This will create an account payable entry from the following text:',
      text: createAccountPayableDto.text,
    };
  }
}
