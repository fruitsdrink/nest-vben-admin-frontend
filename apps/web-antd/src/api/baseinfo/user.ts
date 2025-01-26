import type { DepartmentApi } from './department';
import type { RoleApi } from './role';

import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace UserApi {
  interface UserDto {
    id: number;
    username: string;
    nickName: string;
    realName?: string;
    avatar?: string;
    email?: string;
    phone?: string;
    gender: 0 | 1 | 2;
    sort: number;
    remark?: string;
    status?: 0 | 1;
    isAdmin: 0 | 1;
    createdAt: Date;
    lastLoginAt?: Date;
    lastLoginIp?: string;
    departmentId?: number;
    department?: DepartmentApi.DepartmentDto;
    roles?: RoleApi.RoleDto[];
  }

  export type SaveParams = Partial<UserDto>;
  export type SaveResult = UserDto;
  export type FindListParams = PaginationParams & {
    departmentId?: number;
    status?: '0' | '1';
  };

  /**
   * 新增/编辑用户
   */
  export async function save(data: SaveParams) {
    if (data.id) {
      return requestClient.put<SaveResult>(`/baseinfo/user/${data.id}`, data);
    }
    return requestClient.post<SaveResult>('/baseinfo/user', data);
  }

  /**
   * 查询用户列表
   */
  export async function findList(params: FindListParams) {
    return requestClient.get<UserDto[]>('/baseinfo/user', { params });
  }
  /**
   * 根据id查询用户
   */
  export async function findById(id: number) {
    return requestClient.get<UserDto>(`/baseinfo/user/find/${id}`);
  }

  /**
   * 删除用户
   */
  export async function deleteById(id: number) {
    return requestClient.delete(`/baseinfo/user/${id}`);
  }
}
