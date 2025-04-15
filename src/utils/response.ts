import { DefaultResponseDto } from '../common/dto/generic-response.dto';
import { ISuccessResponse } from '../interfaces/common.interface';

export const successResponse = <T>({ data, message }: ISuccessResponse<T>) => {
  return new DefaultResponseDto({
    message: message,
    data: data,
  });
};

export const isCorrectFormatResponseMessage = (message: string) => {
  return /^[A-Z]+(_[A-Z]+)*$/.test(message);
};
