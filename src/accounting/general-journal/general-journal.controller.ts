import { Controller, Post, Body } from '@nestjs/common';
import { GeneralJournalService } from './general-journal.service';
import { CreateGeneralJournalDto } from './dto/create-general-journal.dto';

@Controller('accounting/general-journal')
export class GeneralJournalController {
  constructor(private readonly generalJournalService: GeneralJournalService) {}

  @Post()
  create(@Body() createGeneralJournalDto: CreateGeneralJournalDto) {
    return this.generalJournalService.create(createGeneralJournalDto);
  }
}
