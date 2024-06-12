import { SuccessCode } from '@/api';
import { APIResponse } from '@/api/type';
import { Message } from '@arco-design/web-react';

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
