import baseAxios from '.';
import { APIListResponse, APIResponse, IPageParams } from './type';

export interface Entrepot {
  consignee: string;
  createBy: number;
  createTime: string;
  deleteStatus: number;
  deliveryAddress: string;
  detailedAddress: string;
  entrepotName: string;
  entrepotType: number;
  id: number;
  inventorySupported: number;
  openUser: number;
  qrCode: string;
  remark: string;
  storeType: string;
  supportArea: string;
  telephone: string;
  updateBy: number;
  updateTime: string;
}

export interface EntrepotStorageRacks {
  available: number;
  createBy: number;
  createTime: string;
  deleteStatus: number;
  entrepotId: number;
  id: number;
  locationPrefix: string;
  numberColumns: number;
  numberFloors: number;
  storageRacksCode: string;
  storageRacksName: string;
  storageRacksType: string;
  updateBy: number;
  updateTime: string;
}

export const entrepotAPI = {
  getList(body: Partial<Entrepot & IPageParams>) {
    return baseAxios.post<APIListResponse<Entrepot>>(
      '/api/entrepot/list',
      body
    );
  },
  insert(body: Partial<Entrepot>) {
    return baseAxios.post<APIResponse>('/api/entrepot/insert', body);
  },
  remove(id) {
    return baseAxios.get(`/api/entrepot/remove/${id}`);
  },
  update(body: Partial<Entrepot>) {
    return baseAxios.post('/api/entrepot/update', {
      Entrepot: body,
    });
  },
};

export const racksAPI = {
  getList(body: Partial<EntrepotStorageRacks & IPageParams>) {
    return baseAxios.post<APIListResponse<EntrepotStorageRacks>>(
      '/api/racks/list',
      body
    );
  },
  insert(body: Partial<EntrepotStorageRacks>) {
    return baseAxios.post<APIResponse>('/api/racks/insert', body);
  },
  remove(id) {
    return baseAxios.get(`/api/racks/remove/${id}`);
  },
  update(body: Partial<EntrepotStorageRacks>) {
    return baseAxios.post('/api/racks/update', {
      EntrepotStorageRacks: body,
    });
  },
};
