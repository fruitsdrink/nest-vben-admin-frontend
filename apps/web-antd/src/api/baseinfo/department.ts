import type { Creator, FindListResult, PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace DepartmentApi {
  export interface DepartmentDto {
    id: string;
    name: string;
    leader?: string;
    phone?: string;
    parentId?: string;
    remark?: string;
    status?: 0 | 1;
    sort: number;
    createdAt: Date;
    creator: Creator;
  }

  export type SaveParams = Partial<DepartmentDto>;
  export type SaveResult = DepartmentDto;
  export type FindListParams = PaginationParams & {
    status?: '0' | '1';
  };

  /**
   * 新增/编辑部门
   */
  export async function save(data: SaveParams) {
    if (data.id) {
      return requestClient.put<SaveResult>(`/baseinfo/department/${data.id}`, data);
    }
    return requestClient.post<SaveResult>('/baseinfo/department', data);
  }

  /**
   * 查询部门列表
   */
  export async function findList(params: FindListParams) {
    return requestClient.get<FindListResult<DepartmentDto>>('/baseinfo/department', { params });
  }

  /**
   * 查询所有部门
   */
  export async function findMany() {
    return requestClient.get<DepartmentDto[]>('/baseinfo/department/find');
  }

  /**
   * 根据id查询部门
   */
  export async function findById(id: string) {
    return requestClient.get<DepartmentDto>(`/baseinfo/department/find/${id}`);
  }

  /**
   * 删除部门
   */
  export async function deleteById(id: string) {
    return requestClient.delete(`/baseinfo/department/${id}`);
  }
}
