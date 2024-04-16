import { Body, Controller, Get, Post } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';

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

  updateSubmitInfo(source, submitInfo) {
    const { username, addLines, removeLines, totalLines } = submitInfo;
    if (!source[username]) {
      source[username] = {
        projects: [submitInfo],
        addLines,
        removeLines,
        totalLines,
      };
      return source;
    }
    const { projects } = source[username];
    source[username].projects = this.updateProject(projects, submitInfo);
    source[username] = this.updateTotalInfo(source[username]);
    return source;
  }

  updateProject(projects, submitInfo) {
    const { projectCode } = submitInfo;
    let isProjectExist = false;
    const newProject = projects.map((p) => {
      if (p.projectCode === projectCode) {
        isProjectExist = true;
        return submitInfo;
      }
      return p;
    });
    if (isProjectExist) {
      return newProject;
    }
    return [...newProject, submitInfo];
  }

  updateTotalInfo(source) {
    if (source.projects?.length === 0) return source;
    source.addLines = source.removeLines = source.totalLines = 0;
    source.projects.reduce(
      (prev, next) => {
        source.addLines = source.addLines + next.addLines;
        source.removeLines = source.removeLines + next.removeLines;
        source.totalLines = source.totalLines + next.totalLines;
        return next;
      },
      { addLines: 0, removeLines: 0, totalLines: 0 },
    );
    return source;
  }

  @Post('collect')
  async lala(@Body() submitDto) {
    const res = await readdir('./archive').catch((err) =>
      console.log('err', err),
    );
    if (res === undefined) {
      await mkdir('./archive');
    }
    const { startDate, endDate } = submitDto;
    submitDto.addLines = parseInt(submitDto.addLines || 0);
    submitDto.removeLines = parseInt(submitDto.removeLines || 0);
    submitDto.totalLines = parseInt(submitDto.totalLines || 0);
    const filePath = `./archive/${startDate}-${endDate}.json`;
    const file = await readFile(filePath).catch((err) =>
      console.log('err', err),
    );
    if (!file) {
      const newData = this.updateSubmitInfo({}, submitDto);
      await writeFile(filePath, JSON.stringify(newData, null, 2));
      return { status: 1, message: '保存成功' };
    } else {
      const currData = JSON.parse(file.toString());
      const newData = this.updateSubmitInfo(currData, submitDto);
      await writeFile(filePath, JSON.stringify(newData, null, 2));
      return { status: 1, message: '保存成功' };
    }
  }
}
