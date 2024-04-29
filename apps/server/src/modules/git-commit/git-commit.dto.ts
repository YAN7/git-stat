import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { throwHttpError } from 'src/utils/http';

export class GitCommitDto {
  @IsNotEmpty({ message: '用户名称userName不能为空' })
  userName: string;

  @IsNotEmpty({ message: '项目名称projectName不能为空' })
  projectName: string;

  @IsNotEmpty({ message: '月份month不能为空' })
  month: string;

  @IsNotEmpty({ message: 'commitId不能为空' })
  commitId: string;

  @IsNotEmpty({ message: '变动文件个数files不能为空' })
  files: number;

  @IsNotEmpty({ message: '变动总行数total不能为空' })
  total: number;

  @IsNotEmpty({ message: '删减行数subLines不能为空' })
  subLines: number;

  @IsNotEmpty({ message: '新增行数addLines不能为空' })
  addLines: number;

  @IsNotEmpty({ message: '新增文件数addFiles不能为空' })
  addFiles: number;

  @IsNotEmpty({ message: '删除文件数subFiles不能为空' })
  @Transform(({ value }) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throwHttpError('删除文件数subFiles必须是数字', 400);
    }
    return parsedValue;
  })
  subFiles: number;
}
