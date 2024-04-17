import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StatDateRangeDto } from './git-stat.dto';
import { GitStatService } from './git-stat.service';

@Controller('git-stat')
export class GitStatController {
  constructor(private readonly gitStatService: GitStatService) {}

  /**
   * 设置统计提交信息的时间区间
   */
  @Post('setDateRange')
  async setDateRange(@Body() body: StatDateRangeDto) {
    return await this.gitStatService.setDateRange(body);
  }

  /**
   * 获取时间区间
   */
  @Get('getDateRange')
  async queryDateRange() {
    return await this.gitStatService.queryDateRange();
  }

  /**
   * 提交统计信息
   */
  @Post('submit')
  async submit(@Body() submitDto) {
    return await this.gitStatService.submit(submitDto);
  }

  /**
   * 根据时间区间获取提交信息
   */
  @Get('getSubmitInfo')
  async getSubmitInfo(@Query() dateRange) {
    return await this.gitStatService.getSubmitInfo(dateRange);
  }
}
