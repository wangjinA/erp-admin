const fs = require('fs/promises');
const templateInfo = {
  name: 'test',
};
const templateStr = `
import adminAxios from '.';
import { APIListResponse, APIResponse, IPageParams } from './type';
export interface Dict {
  createBy: string; // "创建人",
  createTime: string; // "创建时间",
  deleteStatus: number; // "删除状态：0.正常，1.删除",
  dictCode: string; // "字典标识",
  dictName: string; // "字典名称",
  dictStatus: number; // "字典状态：0.正常，1.异常",
  remark: string; // "字典备注",
  sequenceNo: number; // "序号",
  updateBy: string; // "更新人",
  updateTime: string; // "更新时间",
}

export const dictAPI = {
  getList(body?: Partial<Dict & IPageParams>) {
    return adminAxios.post<APIListResponse<Dict>>('/api/dict/list', body);
  },
  get(id: number) {
    return adminAxios.get<APIResponse<Dict>>(\`/api/dict/info/\${id}\`);
  },
  create(body: Partial<Dict>) {
    return adminAxios.post<APIResponse>('/api/dict/insert', body);
  },
  update(body: Partial<Dict>) {
    return adminAxios.post<APIResponse>('/api/dict/update', body);
  },
  remove(id: number) {
    return adminAxios.get<APIResponse>(\`/api/dict/remove/\${id}\`);
  },
};

`;

fs.writeFile(`./src/api/${templateInfo.name}.ts`, templateStr, {
  encoding: 'utf-8',
});
