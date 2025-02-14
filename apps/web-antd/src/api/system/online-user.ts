import type { FindListResult, PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace OnlineUserApi {
  export type FindListParams = PaginationParams & {
    username?: string;
  };

  export type ItemDto = {
    browser: string;
    createdAt: number;
    departmentName?: string;
    ip: string;
    lastLoginAt?: Date;
    os: string;
    realName?: string;
    region: null | string;
    userId: number;
    userName?: string;
  };

  export async function findList(params: FindListParams) {
    return requestClient.get<FindListResult<ItemDto>>('/system/online-user', { params });
  }

  export async function logout(userId: number) {
    return requestClient.post(`/system/online-user/logout`, { userId });
  }
}
