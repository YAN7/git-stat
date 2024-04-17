import { HttpException, HttpStatus } from '@nestjs/common';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';

export const readFile2JSON = async (filepath: string) => {
  if (!filepath) return '';
  const content = await readFile(filepath).catch(() => {
    throw new HttpException(
      `${filepath}不存在`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });
  try {
    return JSON.parse(content.toString());
  } catch {
    throw new HttpException(
      `获取${filepath}文件的json内容失败`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export const writeFile2JSON = async (filepath: string, content: string) => {
  await writeFile(filepath, JSON.stringify(content, null, 2), 'utf-8');
};

export const mkdirIfNotExist = async (dirPath: string) => {
  const res = await readdir(dirPath).catch(console.log);
  // 不存在则创建
  if (res === undefined) {
    await mkdir(dirPath);
  }
};
