import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GitCommit } from './git-commit.entity';

@Injectable()
export class GitCommitService {
  constructor(
    @InjectRepository(GitCommit)
    private gitCommitRepository: Repository<GitCommit>,
  ) {}

  async findAll(): Promise<GitCommit[]> {
    return await this.gitCommitRepository.find();
  }

  async add() {
    return await this.gitCommitRepository.insert({
      month: '2024',
      projectName: 'itom',
    });
  }
}
