import { Injectable } from '@nestjs/common';
import { CreateGeneralLedgerDto } from './dto/create-general-ledger.dto';

@Injectable()
export class GeneralLedgerService {
  create(createGeneralLedgerDto: CreateGeneralLedgerDto) {
    // In the future, this will parse the plain English and create a general ledger entry.
    return {
      message: 'This will create a general ledger entry from the following text:',
      text: createGeneralLedgerDto.text,
    };
  }
}
