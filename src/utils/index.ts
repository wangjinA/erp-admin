import { SuccessCode } from '@/api';
import { APIResponse } from '@/api/type';
import { Message } from '@arco-design/web-react';
import { isArray } from 'lodash';

export function showMessageStatus(resp: APIResponse) {
  if (resp.code === SuccessCode) {
    Message.success({
      content: '操作成功',
      duration: 3000,
    });
    return Promise.resolve();
  } else {
    const errMsg = resp.msg || '操作失败';
    Message.error({
      content: errMsg,
      duration: 3000,
    });
    return Promise.reject(errMsg);
  }
}

export function toArray(value) {
  return isArray(value) ? value : [value];
}

export function tryFn<T>(fn: () => Promise<T>, message: string = '请求失败') {
  return fn().catch((error) => {
    Message.error(message + (error.message || ''));
    return error;
  });
}

export function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
