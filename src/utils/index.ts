import { SuccessCode } from '@/api';
import { APIResponse } from '@/api/type';
import { Message, Modal } from '@arco-design/web-react';
import { ConfirmProps } from '@arco-design/web-react/es/Modal/confirm';
import { isArray } from 'lodash';
import * as XLSX from 'xlsx';

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

export function getFile() {
  return new Promise<File[]>((resolve, reject) => {
    const id = 'import-none-file';

    let fileInput = document.querySelector<HTMLInputElement>(`#${id}`);
    if (!fileInput) {
      fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.display = 'none';
      fileInput.id = id;
      document.body.appendChild(fileInput);
      // fileInput.accept = acceptTypes;
    } else {
      fileInput.files = null;
    }
    fileInput.onchange = (e: any) => {
      if (e.target.files.length) {
        resolve([...e.target.files]);
      } else {
        reject();
      }
    };
    fileInput.click();
  });
}

/**
 * 获取Excel数组
 */
export function getExcleData(file: File): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const data = new Uint8Array(e.target.result as any);
      const workbook = XLSX.read(data, { type: 'array' });
      console.log(workbook);

      resolve(
        workbook.SheetNames.map((item) =>
          XLSX.utils.sheet_to_json(workbook.Sheets[item], { header: 1 })
        ).flat(1) as any
      );
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function timeArrToObject(arr: string[], key1: string, key2: string) {
  if (arr?.length) {
    return {
      key1: arr[0],
      key2: arr[1],
    };
  }
  return {};
}

export function showModal(params: Partial<ConfirmProps>) {
  return new Promise((resolve, reject) => {
    Modal.warning({
      cancelText: '关闭',
      title: '温馨提示',
      closable: true,
      onOk: resolve,
      onCancel: reject,
      ...params,
    });
  });
}
