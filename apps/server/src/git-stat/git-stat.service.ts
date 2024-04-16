import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import { updateSubmitInfo } from 'src/utils';

@Injectable()
export class GitStatService {
  setDateRange(body) {
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

  queryDateRange() {
    const appConfig = JSON.parse(readFileSync('./date.config.json').toString());
    return appConfig;
  }

  async submit(submitDto) {
    const res = await readdir('./archive').catch(console.log);
    if (res === undefined) {
      await mkdir('./archive');
    }
    const { startDate, endDate } = submitDto;
    submitDto.addLines = parseInt(submitDto.addLines || 0);
    submitDto.removeLines = parseInt(submitDto.removeLines || 0);
    submitDto.totalLines = parseInt(submitDto.totalLines || 0);
    const filePath = `./archive/${startDate}-${endDate}.json`;
    const file = await readFile(filePath).catch(console.log);
    if (!file) {
      const newData = updateSubmitInfo({}, submitDto);
      await writeFile(filePath, JSON.stringify(newData, null, 2));
      return { status: 1, message: '保存成功' };
    } else {
      const currData = JSON.parse(file.toString());
      const newData = updateSubmitInfo(currData, submitDto);
      await writeFile(filePath, JSON.stringify(newData, null, 2));
      return { status: 1, message: '保存成功' };
    }
  }

  async getSubmitInfo(queryParams) {
    const { startDate, endDate } = queryParams;
    const filePath = `./archive/${startDate}-${endDate}.json`;
    const file = await readFile(filePath).catch(console.log);
    if (!file) {
      return {
        status: 0,
        message: '此时间区间提交信息不存在',
      };
    }
    return JSON.parse(file.toString());
  }
}
