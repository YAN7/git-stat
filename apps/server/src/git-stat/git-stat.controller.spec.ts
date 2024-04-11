import { Test, TestingModule } from '@nestjs/testing';
import { GitStatController } from './git-stat.controller';

describe('GitStatController', () => {
  let controller: GitStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitStatController],
    }).compile();

    controller = module.get<GitStatController>(GitStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
