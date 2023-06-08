import { Test, TestingModule } from '@nestjs/testing';
import { TieziController } from './tiezi.controller';
import { TieziService } from './tiezi.service';

describe('TieziController', () => {
  let controller: TieziController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TieziController],
      providers: [TieziService],
    }).compile();

    controller = module.get<TieziController>(TieziController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
