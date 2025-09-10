import { Test, TestingModule } from '@nestjs/testing';
import { GeneralJournalController } from './general-journal.controller';

describe('GeneralJournalController', () => {
  let controller: GeneralJournalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralJournalController],
    }).compile();

    controller = module.get<GeneralJournalController>(GeneralJournalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
