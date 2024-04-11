import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('git-stat')
export class GitStatController {
  @Post('setQueryDate')
  wawa(@Body() body) {
    console.log('body ==> ', body);
    return '111';
  }

  @Get('queryDate')
  hehe() {
    return '123';
  }

  @Post('collect')
  lala() {
    return '456';
  }
}
