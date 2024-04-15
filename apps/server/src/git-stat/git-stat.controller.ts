import { Body, Controller, Get, Post } from '@nestjs/common';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

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
    return {
      status: 1,
      message: '设置成功',
    };
  }

  @Get('queryDate')
  hehe() {
    const appConfig = JSON.parse(readFileSync('./date.config.json').toString());
    return appConfig;
  }

  @Post('collect')
  lala(@Body() submitDto) {
    const archive = readdirSync('./archive');
    const { startDate, endDate } = submitDto;
    const filename = `${startDate}-${endDate}.json`;
    const file = readFileSync(`./archive1/${filename}`);
    console.log('file ==> ', file.toString());
    return '456';
  }
}
