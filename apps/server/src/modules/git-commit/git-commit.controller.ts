import { Controller, Get } from '@nestjs/common';
import { GitCommitService } from './git-commit.service';

@Controller('git-commit')
export class GitCommitController {
  constructor(private readonly gitCommitService: GitCommitService) {}

  @Get('add')
  async add() {
    return await this.gitCommitService.add();
  }
}
