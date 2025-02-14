import type { Creator, FindListResult, PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace RoleApi {
  export interface RoleDto {
    id: number;
    name: string;
    remark?: string;
    status?: 0 | 1;
    sort: number;
    createdAt: Date;
    dataAuth?: string;
    dataAuthName?: string;
    creator: Creator;
  }

  export type SaveParams = Partial<RoleDto>;
  export type SaveResult = RoleDto;
  export type FindListParams = PaginationParams & {
    status?: '0' | '1';
  };

  /**
   * 新增/编辑角色
   */
  export async function save(data: SaveParams) {
    if (data.id) {
      return requestClient.put<SaveResult>(`/baseinfo/role/${data.id}`, data);
    }
    return requestClient.post<SaveResult>('/baseinfo/role', data);
  }

  /**
   * 查询分页角色列表
   */
  export async function findList(params: FindListParams) {
    return requestClient.get<FindListResult<RoleDto>>('/baseinfo/role', { params });
  }

  /**
   * 查询所有角色
   */
  export async function findMany() {
    return requestClient.get<RoleDto[]>('/baseinfo/role/find/many');
  }
  /**
   * 根据id查询角色
   */
  export async function findById(id: number) {
    return requestClient.get<RoleDto>(`/baseinfo/role/${id}`);
  }

  /**
   * 删除角色
   */
  export async function deleteById(id: number) {
    return requestClient.delete(`/baseinfo/role/${id}`);
  }
}
