import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { GitCommitDto } from './git-commit.dto';
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

  async add(gitCommitDto: GitCommitDto) {
    const createTime = dayjs().format('YYYY-MM-DD hh:mm:ss');
    return await this.gitCommitRepository.save({ ...gitCommitDto, createTime });
  }
}
