import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GitStatService } from './git-stat.service';

@Controller('git-stat')
export class GitStatController {
  constructor(private readonly gitStatService: GitStatService) {}

  /**
   * 设置统计提交信息的时间区间
   */
  @Post('setDateRange')
  setDateRange(@Body() body) {
    return this.gitStatService.setDateRange(body);
  }

  /**
   * 获取时间区间
   */
  @Get('getDateRange')
  queryDateRange() {
    return this.queryDateRange();
  }

  /**
   * 提交统计信息
   */
  @Post('submit')
  async submit(@Body() submitDto) {
    return this.gitStatService.submit(submitDto);
  }

  /**
   * 根据时间区间获取提交信息
   */
  @Get('getSubmitInfo')
  async getSubmitInfo(@Query() dateRange) {
    this.gitStatService.getSubmitInfo(dateRange);
  }
}
