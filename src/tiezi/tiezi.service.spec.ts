import { Test, TestingModule } from '@nestjs/testing';
import { TieziService } from './tiezi.service';

describe('TieziService', () => {
  let service: TieziService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TieziService],
    }).compile();

    service = module.get<TieziService>(TieziService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
