import { Body, Controller, Get, Post } from '@nestjs/common';
import { GitCommitDto } from './git-commit.dto';
import { GitCommitService } from './git-commit.service';

@Controller('commit')
export class GitCommitController {
  constructor(private readonly gitCommitService: GitCommitService) {}

  @Post('add')
  async add(@Body() gitCommitDto: GitCommitDto) {
    return await this.gitCommitService.add(gitCommitDto);
  }

  @Get('getAll')
  async getAll() {
    return await this.gitCommitService.findAll();
  }
}
