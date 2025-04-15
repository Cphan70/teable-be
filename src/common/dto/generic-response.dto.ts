// import { IMeta } from '../../../interfaces/paging.interface';

export class DefaultResponseDto<T> {
  message: string;
  data: T;
  //   meta: IMeta;

  constructor({
    message,
    data,
    // meta,
  }: {
    message: string;
    data: T;
    // meta?: IMeta
  }) {
    this.message = message;
    this.data = data;
    // this.meta = meta;
  }
}

export class GenericResponseDto<T> {
  code?: number;
  message: string;
  data: T;
  //   meta: IMeta;

  constructor({
    code,
    message,
    data,
    // meta,
  }: {
    code?: number;
    message: string;
    data: T;
    // meta?: IMeta;
  }) {
    this.code = code;
    this.message = message;
    this.data = data;
    // this.meta = meta;
  }
}
