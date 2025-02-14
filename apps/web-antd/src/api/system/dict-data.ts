import type { DictTypeApi } from './dict-type';

import type { FindListResult, PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace DictDataApi {
  export type FindListParams = PaginationParams & {
    dictTypeId?: string;
    keyword?: string;
    status?: string;
  };

  export type ItemDto = {
    canDelete: boolean;
    canEdit: boolean;
    dictType: DictTypeApi.ItemDto;
    dictTypeId: string;
    displayType?: number;
    id: string;
    label: string;
    remark: string;
    sort: number;
    status?: number;
    value: string;
  };

  export interface CreateDto {
    label: string;
    value: string;
    status: number;
    sort?: number;
    remark?: string;
    displayType: number;
    dictTypeId: string;
  }

  export interface UpdateDto extends CreateDto {
    id: string;
  }

  export type SaveDto = CreateDto | UpdateDto;

  export async function findList(params: FindListParams) {
    return requestClient.get<FindListResult<ItemDto>>('/system/dict-data', { params });
  }

  export async function findById(id: string) {
    return requestClient.get<ItemDto>(`/system/dict-data/${id}`);
  }

  export async function create(data: CreateDto) {
    return requestClient.post<ItemDto>('/system/dict-data', data);
  }

  export async function update(id: string, data: UpdateDto) {
    return requestClient.put<ItemDto>(`/system/dict-data/${id}`, data);
  }

  export async function save(data: SaveDto) {
    data.status = Number(data.status);
    data.sort = Number(data.sort);
    data.displayType = Number(data.displayType);
    return 'id' in data && data.id ? update(data.id, data) : create(data);
  }

  export async function remove(id: string) {
    return requestClient.delete(`/system/dict-data/${id}`);
  }
}
