import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitStatModule } from './git-stat/git-stat.module';

@Module({
  imports: [GitStatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
