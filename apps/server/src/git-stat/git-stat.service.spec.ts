import { Test, TestingModule } from '@nestjs/testing';
import { GitStatService } from './git-stat.service';

describe('GitStatService', () => {
  let service: GitStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitStatService],
    }).compile();

    service = module.get<GitStatService>(GitStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
