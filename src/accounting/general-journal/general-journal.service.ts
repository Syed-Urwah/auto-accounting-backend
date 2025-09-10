import { Injectable } from '@nestjs/common';
import { CreateGeneralJournalDto } from './dto/create-general-journal.dto';

@Injectable()
export class GeneralJournalService {
  create(createGeneralJournalDto: CreateGeneralJournalDto) {
    // In the future, this will parse the plain English and create a general journal entry.
    return {
      message: 'This will create a general journal entry from the following text:',
      text: createGeneralJournalDto.text,
    };
  }
}
