import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GitCommitController } from './git-commit.controller';
import { GitCommit } from './git-commit.entity';
import { GitCommitService } from './git-commit.service';

@Module({
  imports: [TypeOrmModule.forFeature([GitCommit])],
  providers: [GitCommitService],
  controllers: [GitCommitController],
})
export class GitCommitModule {}
