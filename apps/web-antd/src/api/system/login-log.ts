import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace LoginLogApi {
  export type FindListParams = PaginationParams & {
    endTime?: string;
    ip?: string;
    startTime?: string;
    status?: string;
    username?: string;
  };

  export type LoginLogItemDto = {
    address?: string;
    browser?: string;
    id: string;
    ip?: string;
    loginAt: Date;
    loginMessage: string;
    loginResult: number;
    os?: string;
    userId?: string;
  };

  export type LoginLogResultDto = {
    items: LoginLogItemDto[];
    total: number;
  };

  export type DeleteLoginLogDto = {
    ids: string[];
  };

  export async function findList(params: FindListParams) {
    return requestClient.get<LoginLogResultDto>('/system/login-log', { params });
  }

  export async function remove(params: DeleteLoginLogDto) {
    return requestClient.delete('/system/login-log/delete', { data: params });
  }

  export async function clear() {
    return requestClient.delete('/system/login-log/clear');
  }
}
