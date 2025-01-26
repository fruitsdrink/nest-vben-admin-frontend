import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace RoleApi {
  interface RoleDto {
    id: number;
    name: string;
    remark?: string;
    status?: 0 | 1;
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
   * 查询角色列表
   */
  export async function findList(params: FindListParams) {
    return requestClient.get<RoleDto[]>('/baseinfo/role', { params });
  }
  /**
   * 根据id查询角色
   */
  export async function findById(id: number) {
    return requestClient.get<RoleDto>(`/baseinfo/role/find/${id}`);
  }

  /**
   * 删除角色
   */
  export async function deleteById(id: number) {
    return requestClient.delete(`/baseinfo/role/${id}`);
  }
}
