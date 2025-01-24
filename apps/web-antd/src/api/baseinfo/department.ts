import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace DepartmentApi {
  interface DepartmentDto {
    id: number;
    name: string;
    leader?: string;
    phone?: string;
    parentId?: number;
    remark?: string;
    status?: 0 | 1;
  }

  export type SaveParams = Partial<DepartmentDto>;
  export type SaveResult = DepartmentDto;
  export type FindListParams = PaginationParams & {
    status?: '0' | '1';
  };

  /**
   * 新增部门
   */
  export async function save(data: SaveParams) {
    if (data.id) {
      return requestClient.put<SaveResult>(`/baseinfo/department/${data.id}`, data);
    }
    return requestClient.post<SaveResult>('/baseinfo/department', data);
  }

  export async function findList(params: PaginationParams) {
    return requestClient.get<DepartmentDto[]>('/baseinfo/department', { params });
  }

  export async function findById(id: number) {
    return requestClient.get<DepartmentDto>(`/baseinfo/department/find/${id}`);
  }

  export async function deleteById(id: number) {
    return requestClient.delete(`/baseinfo/department/${id}`);
  }
}
