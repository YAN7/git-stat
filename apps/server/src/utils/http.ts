import { HttpException, HttpStatus } from '@nestjs/common';
import { StatusCode } from 'src/git-stat/emun';

export const throwHttpError = (
  message,
  code = HttpStatus.INTERNAL_SERVER_ERROR,
) => {
  throw new HttpException(
    {
      status: StatusCode.ERROR,
      message,
    },
    code,
  );
};
