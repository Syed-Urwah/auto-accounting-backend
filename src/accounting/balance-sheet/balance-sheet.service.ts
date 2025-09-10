import { Injectable } from '@nestjs/common';
import { CreateBalanceSheetDto } from './dto/create-balance-sheet.dto';

@Injectable()
export class BalanceSheetService {
  create(createBalanceSheetDto: CreateBalanceSheetDto) {
    // In the future, this will parse the plain English and create a balance sheet.
    return {
      message: 'This will create a balance sheet from the following text:',
      text: createBalanceSheetDto.text,
    };
  }
}
