import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitCommitModule } from './modules/git-commit/git-commit.module';
import { GitStatModule } from './modules/git-stat/git-stat.module';

console.log(
  '111 ==> ',
  __dirname + '/modules/git-commit/git-commit.entity.{js,ts}}',
);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Aa3211!@#',
      database: 'git_stat',
      // entities: ['/src/**/*.entity.{ts,js}'],
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      // 定义数据库表结构与实体类字段一致（一旦数据库少了字段就会自动加入，谨慎使用，可能会导致数据丢失）
      synchronize: false,
    }),
    GitStatModule,
    GitCommitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
