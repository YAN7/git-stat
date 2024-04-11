import { Body, Controller, Get, Post } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';

@Controller('git-stat')
export class GitStatController {
  @Post('setQueryDate')
  wawa(@Body() body) {
    const appConfig = JSON.parse(readFileSync('./date.config.json').toString());
    appConfig.startDate = body.startDate;
    appConfig.endDate = body.endDate;
    writeFileSync(
      './date.config.json',
      JSON.stringify(appConfig, null, 2),
      'utf-8',
    );
  }

  @Get('queryDate')
  hehe() {
    const appConfig = JSON.parse(readFileSync('./date.config.json').toString());
    return appConfig;
  }

  @Post('collect')
  lala() {
    return '456';
  }
}
