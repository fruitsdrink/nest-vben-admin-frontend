import type { DepartmentApi } from './department';
import type { RoleApi } from './role';

import type { Creator, FindListResult, PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace UserApi {
  export interface UserDto {
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
    departmentId?: string;
    department?: DepartmentApi.DepartmentDto;
    roles?: RoleApi.RoleDto[];
    dataAuth?: string;
    dataAuthName?: string;
    creator: Creator;
  }

  export type SaveParams = Partial<UserDto>;
  export type SaveResult = UserDto;
  export type FindListParams = PaginationParams & {
    departmentId?: number;
    status?: '0' | '1';
  };

  export type Profile = {
    avatar: string;
    department?: { id: string; name: string };
    email?: string;
    id: number;
    isAdmin: boolean;
    phone?: string;
    realName?: string;
    roles: { id: number; name: string }[];
    username: string;
  };

  export async function profile() {
    return requestClient.get<Profile>('/user/profile');
  }

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
    return requestClient.get<FindListResult<UserDto>>('/baseinfo/user', { params });
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

  /**
   * 重置密码
   */
  export async function resetPassword(data: { password: string; userId: number }) {
    return requestClient.post('/baseinfo/user/reset-password', data);
  }

  /**
   * 校验密码
   * @param password 密码
   */
  export async function validatePassword(password: string) {
    return requestClient.post('/baseinfo/user/validate-password', { password });
  }

  /**
   * 修改密码
   * @param data.newPassword 新密码
   * @param data.password 旧密码
   * newPassword 新密码
   * password 旧密码
   */
  export async function editPassword(data: { newPassword: string; password: string }) {
    return requestClient.post('/baseinfo/user/edit-password', data);
  }

  /**
   * 上传头像
   * @param data 表单数据
   */
  export async function uploadAvatar(data: FormData) {
    return requestClient.post<{ isok: boolean }>('/user/profile/upload-avatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  /**
   * 更新用户信息
   * @param data 用户信息
   */
  export async function updateProfile(data: Partial<UserDto>) {
    return requestClient.put<Profile>('/user/profile', data);
  }
}
