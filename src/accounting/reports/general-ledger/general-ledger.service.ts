import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntry } from 'src/accounting/entities/journal-entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneralLedgerService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
  ) {}

  async findAll(accountId: number) {
    return this.journalEntryRepository.find({ where: { account: { id: accountId } } });
  }
}
