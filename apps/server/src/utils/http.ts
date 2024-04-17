import { HttpException, HttpStatus } from '@nestjs/common';

export const throwHttpError = (
  message,
  code = HttpStatus.INTERNAL_SERVER_ERROR,
) => {
  throw new HttpException(message, code);
};
