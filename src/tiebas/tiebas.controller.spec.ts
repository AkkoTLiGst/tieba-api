import { Test, TestingModule } from '@nestjs/testing';
import { TiebasController } from './tiebas.controller';
import { TiebasService } from './tiebas.service';

describe('TiebasController', () => {
  let controller: TiebasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiebasController],
      providers: [TiebasService],
    }).compile();

    controller = module.get<TiebasController>(TiebasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
