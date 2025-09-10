import { Test, TestingModule } from '@nestjs/testing';
import { TrialBalanceController } from './trial-balance.controller';

describe('TrialBalanceController', () => {
  let controller: TrialBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrialBalanceController],
    }).compile();

    controller = module.get<TrialBalanceController>(TrialBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
