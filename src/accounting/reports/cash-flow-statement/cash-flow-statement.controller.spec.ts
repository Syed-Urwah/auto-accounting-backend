import { Test, TestingModule } from '@nestjs/testing';
import { CashFlowStatementController } from './cash-flow-statement.controller';

describe('CashFlowStatementController', () => {
  let controller: CashFlowStatementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashFlowStatementController],
    }).compile();

    controller = module.get<CashFlowStatementController>(CashFlowStatementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
