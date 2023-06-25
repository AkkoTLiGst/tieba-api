import { Test, TestingModule } from '@nestjs/testing';
import { IdArrayController } from './id-array.controller';
import { IdArrayService } from './id-array.service';

describe('IdArrayController', () => {
  let controller: IdArrayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdArrayController],
      providers: [IdArrayService],
    }).compile();

    controller = module.get<IdArrayController>(IdArrayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
