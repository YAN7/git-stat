import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import * as contentDisposition from 'content-disposition';

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

  /**
   * 根据时间区间导出提交信息
   */
  @Get('exportSubmitInfo')
  async exportSubmitInfo(@Query() dateRange, @Res() res) {
    const { buffer, filename } =
      await this.gitStatService.exportSubmitInfo(dateRange);
    return res
      .set('Content-Disposition', contentDisposition(filename))
      .send(buffer);
  }

  /**
   * 获取所有的时间区间
   */
  @Get('getAllDateRange')
  async getAllDateRange() {
    return await this.gitStatService.getAllDateRange();
  }
}
