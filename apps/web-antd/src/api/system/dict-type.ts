import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace DictTypeApi {
  export type FindListParams = PaginationParams & {
    code?: string;
    name?: string;
    status?: number;
  };

  export type ItemDto = {
    canDelete: boolean;
    canEdit: boolean;
    code: string;
    id: string;
    name: string;
    remark: string;
    status?: number;
  };

  export type ListDto = {
    items: ItemDto[];
    total: number;
  };

  export interface CreateDto {
    code: string;
    name: string;
    remark: string;
    status?: number;
  }

  export interface UpdateDto extends CreateDto {
    id: string;
  }

  export type SaveDto = CreateDto | UpdateDto;

  export async function findList(params: FindListParams) {
    return requestClient.get<ListDto>('/system/dict-type', { params });
  }

  export async function findById(id: string) {
    return requestClient.get<ItemDto>(`/system/dict-type/${id}`);
  }

  export async function create(data: CreateDto) {
    return requestClient.post<ItemDto>('/system/dict-type', data);
  }

  export async function update(id: string, data: UpdateDto) {
    return requestClient.put<ItemDto>(`/system/dict-type/${id}`, data);
  }

  export async function save(data: SaveDto) {
    return 'id' in data && data.id ? update(data.id, data) : create(data);
  }

  export async function remove(id: string) {
    return requestClient.delete(`/system/dict-type/${id}`);
  }
}
