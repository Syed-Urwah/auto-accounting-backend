import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { GeneralJournalService } from './general-journal.service';
import { CreateGeneralJournalDto } from './dto/create-general-journal.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('accounting/general-journal')
export class GeneralJournalController {
  constructor(private readonly generalJournalService: GeneralJournalService) {}

  @Post()
  create(@Body() createGeneralJournalDto: CreateGeneralJournalDto) {
    return this.generalJournalService.create(createGeneralJournalDto);
  }

  @Get()
  get(@Query('companyId') companyId: number, @Query() paginationDto: PaginationDto) {
    console.log('Pagination DTO:', paginationDto);
    return this.generalJournalService.get(companyId, paginationDto);
  }

  @Get('/by-general-journal')
  getJournalEntriesByTransactionId(@Query('companyId') companyId: number) {
    return this.generalJournalService.getJournalEntriesByTransactionId(companyId);
  }
}
