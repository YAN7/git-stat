import { Injectable } from '@nestjs/common';
import * as ExcelJs from 'exceljs';
import { readdir, readFile } from 'fs/promises';
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
      code: StatusCode.SUCCESS,
      success: true,
      message: '设置成功',
    };
  }

  async queryDateRange() {
    const dateRange = await readFile2JSON(DATE_CONFIG_PATH);
    return {
      code: StatusCode.SUCCESS,
      message: 'success',
      success: true,
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
    const filePath = `${ARCHIVE_PATH}/${startDate}_${endDate}.json`;
    const file = await readFile(filePath).catch(console.log);

    // 对应的json文件不存在则默认是{}
    const currData = file ? JSON.parse(file.toString()) : {};
    const newData = updateSubmitInfo(currData, submitDto);
    await writeFile2JSON(filePath, newData);
    return { code: StatusCode.SUCCESS, message: '提交成功' };
  }

  async getSubmitInfo(dateRange: StatDateRangeDto) {
    this.validateDateRangeParams(dateRange);
    const { startDate, endDate } = dateRange;
    const filePath = `${ARCHIVE_PATH}/${startDate}_${endDate}.json`;
    const fileContent = await readFile(filePath).catch(console.log);
    if (!fileContent) {
      return throwHttpError('此时间区间提交信息不存在');
    }
    return {
      code: StatusCode.SUCCESS,
      success: true,
      data: JSON.parse(fileContent.toString()),
    };
  }

  transformJson2Arr(sourceJson) {
    const result = [];
    Object.entries(sourceJson).forEach(([name, info]: any, i) => {
      const notes = info.projects.reduce((prev, next) => {
        return next.note
          ? `${prev}${prev === '' ? '' : '\n'}${next.projectName}:${next.note}`
          : '';
      }, '');
      result[i] = [name, info.addLines, info.submitTimes, notes];
    });
    return result;
  }

  generateExcel(fileContent): ExcelJs.Workbook {
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('sheet1', {
      properties: { defaultColWidth: 20 },
    });
    const data = this.transformJson2Arr(JSON.parse(fileContent.toString()));
    const title = ['前端开发代码统计'];
    const header = ['用户名', '新增代码行数', '提交次数', '备注'];
    worksheet.addRow(title);
    worksheet.addRow(header);
    worksheet.addRows(data);
    worksheet.mergeCells('A1:D1');
    worksheet.getColumn(4).width = 40;
    worksheet.eachRow((row, rowNumber) => {
      const isHeader = rowNumber === 1;
      row.font = {
        size: isHeader ? 16 : 13,
        bold: isHeader,
      };
      row.height = isHeader ? 40 : 28;
      row.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      };
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          right: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
        };
      });
    });
    worksheet.getColumn(4).eachCell((cell, cellNumber) => {
      cell.alignment = {
        horizontal: cellNumber === 1 || cellNumber === 2 ? 'center' : 'left',
        vertical: 'middle',
        wrapText: true,
      };
    });
    return workbook;
  }

  async exportSubmitInfo(dateRange: StatDateRangeDto) {
    this.validateDateRangeParams(dateRange);
    const { startDate, endDate } = dateRange;
    const filePath = `${ARCHIVE_PATH}/${startDate}_${endDate}.json`;
    const fileContent = await readFile(filePath).catch(console.log);
    if (!fileContent) return throwHttpError('此时间区间提交信息不存在');

    const workbook = this.generateExcel(fileContent);
    const buffer = await workbook.xlsx.writeBuffer().catch(console.log);
    const filename = `前端开发${startDate}至${endDate}代码统计.xlsx`;
    return { buffer, filename };
  }

  async getAllDateRange() {
    const res = await readdir(ARCHIVE_PATH).catch(() => {
      throwHttpError('查找失败');
    });
    if (res) {
      return {
        success: true,
        code: StatusCode.SUCCESS,
        data: res?.map((s) => s.replace('.json', '')),
      };
    }
  }
}
