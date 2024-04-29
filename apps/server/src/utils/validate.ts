import { throwHttpError } from './http';

export const validateIsInt =
  (key: string) =>
  ({ value }) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throwHttpError(`${key}必须是数字`, 400);
    }
    return parsedValue;
  };
