import { Test, TestingModule } from '@nestjs/testing';
import { IdArrayService } from './id-array.service';

describe('IdArrayService', () => {
  let service: IdArrayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdArrayService],
    }).compile();

    service = module.get<IdArrayService>(IdArrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
