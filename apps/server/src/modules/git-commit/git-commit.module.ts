import { Module } from '@nestjs/common';
import { GitCommitService } from './git-commit.service';
import { GitCommitController } from './git-commit.controller';

@Module({
  providers: [GitCommitService],
  controllers: [GitCommitController]
})
export class GitCommitModule {}
