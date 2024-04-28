import { Controller, Get } from '@nestjs/common';

@Controller('git-commit')
export class GitCommitController {
  @Get('add')
  add() {
    return '111';
  }
}
