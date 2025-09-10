import { Test, TestingModule } from '@nestjs/testing';
import { GeneralJournalService } from './general-journal.service';

describe('GeneralJournalService', () => {
  let service: GeneralJournalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralJournalService],
    }).compile();

    service = module.get<GeneralJournalService>(GeneralJournalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
