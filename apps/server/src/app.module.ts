import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitCommitModule } from './modules/git-commit/git-commit.module';
import { GitStatModule } from './modules/git-stat/git-stat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'common_user',
      password: 'Aa3211',
      database: 'git_stat',
      entities: [],
      // synchronize: true 不应在生产中使用，否则可能会丢失数据
      synchronize: false,
    }),
    GitStatModule,
    GitCommitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
