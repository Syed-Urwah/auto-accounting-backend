import { Test, TestingModule } from '@nestjs/testing';
import { CashFlowStatementService } from './cash-flow-statement.service';

describe('CashFlowStatementService', () => {
  let service: CashFlowStatementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashFlowStatementService],
    }).compile();

    service = module.get<CashFlowStatementService>(CashFlowStatementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
