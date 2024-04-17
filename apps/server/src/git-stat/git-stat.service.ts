import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { updateSubmitInfo } from 'src/utils';
import { mkdirIfNotExist, readFile2JSON, writeFile2JSON } from 'src/utils/file';
import { throwHttpError } from 'src/utils/http';
import { ARCHIVE_PATH, DATE_CONFIG_PATH } from './constants';
import { StatusCode } from './emun';
import { GitStatSubmitDto, StatDateRangeDto } from './git-stat.dto';
import { SubmitPramsKey } from './git-stat.types';

@Injectable()
export class GitStatService {
  validateDateRangeParams(dateRange: StatDateRangeDto) {
    const { startDate, endDate } = dateRange;
    if (!startDate) {
      throwHttpError('startDate不能为空', 400);
    }
    if (!endDate) {
      throwHttpError('endDate不能为空', 400);
    }
  }

  async setDateRange(dateRange: StatDateRangeDto) {
    this.validateDateRangeParams(dateRange);
    const dateConfig = await readFile2JSON(DATE_CONFIG_PATH);
    dateConfig.startDate = dateRange.startDate;
    dateConfig.endDate = dateRange.endDate;
    await writeFile2JSON(DATE_CONFIG_PATH, dateConfig);
    return {
      status: StatusCode.SUCCESS,
      message: '设置成功',
    };
  }

  async queryDateRange() {
    const dateRange = await readFile2JSON(DATE_CONFIG_PATH);
    return {
      status: StatusCode.SUCCESS,
      message: 'success',
      ...dateRange,
    };
  }

  validateSubmitParams(submitDto: GitStatSubmitDto) {
    const requiredParams: Partial<SubmitPramsKey>[] = [
      'startDate',
      'endDate',
      'gitUsername',
      'projectName',
      'projectCode',
      'username',
      'addLines',
      'removeLines',
      'totalLines',
      'submitTimes',
    ];
    requiredParams.forEach((k) => {
      if (submitDto[k] === '' || submitDto[k] === undefined) {
        throwHttpError(`${k}不能为空`, 400);
      }
    });
  }

  ensureSubmitParamsCorrect(submitDto: GitStatSubmitDto) {
    submitDto.addLines = Number(submitDto.addLines || 0);
    submitDto.removeLines = Number(submitDto.removeLines || 0);
    submitDto.totalLines = Number(submitDto.totalLines || 0);
    submitDto.submitTimes = Number(submitDto.submitTimes || 0);
  }

  async submit(submitDto: GitStatSubmitDto) {
    // 校验参数
    this.validateSubmitParams(submitDto);
    // 确保archive文件夹存在
    mkdirIfNotExist(ARCHIVE_PATH);
    // 确保入参正确
    this.ensureSubmitParamsCorrect(submitDto);

    const { startDate, endDate } = submitDto;
    const filePath = `${ARCHIVE_PATH}/${startDate}-${endDate}.json`;
    const file = await readFile(filePath).catch(console.log);

    // 对应的json文件不存在则默认是{}
    const currData = file ? JSON.parse(file.toString()) : {};
    const newData = updateSubmitInfo(currData, submitDto);
    await writeFile2JSON(filePath, newData);
    return { status: StatusCode.SUCCESS, message: '提交成功' };
  }

  async getSubmitInfo(dateRange: StatDateRangeDto) {
    this.validateDateRangeParams(dateRange);
    const { startDate, endDate } = dateRange;
    const filePath = `${ARCHIVE_PATH}/${startDate}-${endDate}.json`;
    const fileContent = await readFile(filePath).catch(console.log);
    if (!fileContent) {
      return throwHttpError('此时间区间提交信息不存在');
    }
    return {
      status: StatusCode.SUCCESS,
      data: JSON.parse(fileContent.toString()),
    };
  }

  async exportSubmitInfo(dateRange: StatDateRangeDto) {
    this.validateDateRangeParams(dateRange);
    const { startDate, endDate } = dateRange;
    const filePath = `${ARCHIVE_PATH}/${startDate}-${endDate}.json`;
    const fileContent = await readFile(filePath).catch(console.log);
    if (!fileContent) {
      return throwHttpError('此时间区间提交信息不存在');
    }
    return 123;
  }
}
