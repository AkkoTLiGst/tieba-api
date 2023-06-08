import { Test, TestingModule } from '@nestjs/testing';
import { TiebasService } from './tiebas.service';

describe('TiebasService', () => {
  let service: TiebasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiebasService],
    }).compile();

    service = module.get<TiebasService>(TiebasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
