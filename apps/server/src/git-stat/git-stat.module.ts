import { Module } from '@nestjs/common';
import { GitStatController } from './git-stat.controller';
import { GitStatService } from './git-stat.service';

@Module({
  controllers: [GitStatController],
  providers: [GitStatService],
})
export class GitStatModule {}
