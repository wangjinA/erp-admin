import { Message, Modal } from '@arco-design/web-react'
import { ConfirmProps } from '@arco-design/web-react/es/Modal/confirm'
import { SorterInfo } from '@arco-design/web-react/es/Table/interface'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { isArray, isNil } from 'lodash'
import * as XLSX from 'xlsx'

import { SuccessCode } from '@/api'
import { APIResponse, SorterReq } from '@/api/type'
import { UserInfo } from '@/api/admin/user'

export function toArray(value) {
  return isArray(value) ? value : [value]
}

export function tryFn<T>(fn: () => Promise<T>, message: string = '请求失败') {
  return fn().catch((error) => {
    Message.error(message + (error.message || ''))
    return error
  })
}

export function isSuccessCode(code: number) {
  return [SuccessCode, 0].includes(code)
}

export function showMessage<T>(fn: () => Promise<AxiosResponse<APIResponse<T>>>, message: string = '操作', showSuccessMessage = true): Promise<AxiosResponse<APIResponse<T>>> {
  return fn().then((resp: AxiosResponse<APIResponse<T>>) => {
    if (isSuccessCode(resp.data.code)) {
      if (showSuccessMessage) {
        Message.success({
          content: `${message}成功`,
          duration: 3000,
        })
      }
      return resp
    }
    else {
      console.log(resp.data)

      const errMsg = resp.data.msg || `${message}失败`
      throw new Error(errMsg)
    }
  }).catch((error) => {
    const msg = error?.response?.data?.msg || error?.message || ''
    Message.error({
      content: `${message}失败${msg ? `，${msg}` : ''}`,
      duration: 3000,
    })
    throw new Error(msg)
  })
}

export function sleep(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export function getFile() {
  return new Promise<File[]>((resolve, reject) => {
    const id = 'import-none-file'

    let fileInput = document.querySelector<HTMLInputElement>(`#${id}`)
    if (!fileInput) {
      fileInput = document.createElement('input')
      fileInput.type = 'file'
      fileInput.style.display = 'none'
      fileInput.id = id
      document.body.appendChild(fileInput)
      // fileInput.accept = acceptTypes;
    }
    else {
      fileInput.files = null
    }
    fileInput.onchange = (e: any) => {
      if (e.target.files.length) {
        resolve([...e.target.files])
      }
      else {
        reject(new Error('文件选择取消'))
      }
    }
    fileInput.click()
  })
}

/**
 * 获取Excel数组
 */
export function getExcleData(file: File): Promise<any[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async function (e) {
      const data = new Uint8Array(e.target.result as any)
      const workbook = XLSX.read(data, { type: 'array' })
      console.log(workbook)

      resolve(
        workbook.SheetNames.map(item =>
          XLSX.utils.sheet_to_json(workbook.Sheets[item], { header: 1 }),
        ).flat(1) as any,
      )
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}


export function exportToExcel(data: any[][], fileName: string, columnWidths: any[] = []) {
  // 创建工作簿
  var workbook = XLSX.utils.book_new();
  // 创建工作表
  var worksheet = XLSX.utils.aoa_to_sheet(data);

  worksheet["!cols"] = columnWidths;

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  // 生成Excel文件的二进制数据
  var excelData = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
  // 创建Blob对象
  var blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  // 创建下载链接
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  link.click();
}


export function timeArrToObject(arr: string[], key1: string, key2: string) {
  if (arr?.length) {
    return {
      [key1]: arr[0],
      [key2]: arr[1],
    }
  }
  return {}
}

export function showModal(params: Partial<ConfirmProps>) {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      cancelText: '关闭',
      title: '温馨提示',
      content: '确认操作？',
      closable: true,
      okButtonProps: {
        status: 'danger',
      },
      ...params,
      onOk: async () => {
        try {
          if (params.onOk) {
            const res = await params.onOk()
            resolve(res);
          }else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      },
      onCancel: reject,
    })
  })
}

export function showObj<T>(isShow, obj: T): T[] {
  if (isShow) {
    return [obj]
  }
  else {
    return []
  }
}

export function formatDate(date: string, defaultDate?: dayjs.ConfigType) {
  if (!date && !defaultDate) {
    return '-'
  }
  return dayjs(date || defaultDate).format('YYYY年MM月DD日 HH:mm').replace(`${new Date().getFullYear()}年`, '')
}

export function isProd() {
  return process.env.NODE_ENV === 'production'
}

/**
 * 字符串脱敏
 */
export function stringToMasked(str: string, symbol = '*') {
  if (!str) {
    return ''
  }
  const len = str.length
  const first = str[0]
  const last = str[len - 1]
  const middle = str.slice(1, len - 1)
  return `${first}${middle.replace(/./g, symbol)}${last}`
}

/**
 * 获取过期状态
 */
export function getExpiredStatus(expiredDate: string): '' | 'red' | 'warning' {
  if (!expiredDate) {
    return ''
  }
  return (dayjs(expiredDate).isBefore(dayjs()))
    ? 'red'
    : (dayjs(expiredDate).isBefore(dayjs().add(10, 'day'))) ? 'warning' : ''
}

export function sorterToRequestInfo(sorter: SorterInfo): {
  sorter?: SorterReq
} {
  if (!sorter?.direction) {
    return {}
  }
  const sortMap = {
    ascend: 'ASC',
    descend: 'DESC',
  }
  return {
    sorter: {
      field: sorter.field as string,
      order: sortMap[sorter.direction] as any,
    },
  }
}

/**
 * 将字符串中的空格 换行 大写逗号 分号 统一转成小写逗号分隔
 */
export function replaceQueryValue(value?: string) {
  if (isNil(value)) {
    return null;
  }
  return value.replace(/[\s，；;]+/g, ',').replace(/,+/g, ',').replace(/^,|,$/g, '');
}

export function replaceQueryValueByObject(obj: any, keys: string[]) {
  Object.keys(obj).forEach(key => {
    if (keys.includes(key)) {
      obj[key] = replaceQueryValue(obj[key])
    }
  })
  return obj;
}


/**
 * 生成指定长度范围内的随机数值字符串
 * @param minLength 最小长度（包含）
 * @param maxLength 最大长度（包含）
 * @returns 数值字符串（不含前导 0）
 */
export function randomNumericString(minLength: number = 9, maxLength: number = 11): string {
  if (minLength > maxLength || minLength <= 0) {
    throw new Error('参数错误：minLength 应小于或等于 maxLength，且大于 0');
  }

  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  // 第一位不能是0，避免前导0
  const firstDigit = Math.floor(Math.random() * 9) + 1;

  let result = firstDigit.toString();
  for (let i = 1; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }

  return result;
}

// 将*号处理为空字符串
export function replaceXStr(str: string) {
  return str?.replace(new RegExp('\\*', 'g'), '') || ''
}

/**
 * 检测字符串是否只包含中文（含繁体字）
 * @param {string} str - 要检测的字符串
 * @returns {boolean}
 */
export function isOnlyChinese(str) {
  // \u4E00-\u9FFF  基本汉字区（简体、常见繁体）
  // \u3400-\u4DBF  扩展A区（生僻字）
  // \uF900-\uFAFF  兼容汉字（繁体多）
  // \u2E80-\u2EFF  部首补充
  // \u31C0-\u31EF  笔画符号
  const reg = /^[\u2E80-\u2EFF\u31C0-\u31EF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]+$/;
  return reg.test(str);
}

export function checkIsSpotRole(userInfo: Partial<UserInfo>) {
  return userInfo?.roleName?.length && userInfo.roleName.some(o => ['现货', '現貨'].some(r => o.includes(r)))
}