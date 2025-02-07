import type { NotificationItem } from '@vben/layouts';

import type { UserApi } from '../baseinfo';

import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace NotificationApi {
  export type ItemDto = {
    content: string;
    createdAt: Date;
    id: string;
    noticeType: 0 | 1;
    publishTime: Date;
    publishUser: UserApi.UserDto;
    publishUserId: number;
    remark?: string;
    status: 0 | 1;
    title: string;
  };

  export type CreateDto = {
    content: string;
    noticeType: number;
    publishTime: Date;
    publishUserId: number;
    remark?: string;
    status: number;
    title: string;
  };

  export type UpdateDto = CreateDto & { id: string };

  export type SaveParams = Partial<CreateDto | UpdateDto>;
  export type SaveResult = ItemDto;
  export type FindListParams = PaginationParams & {
    noticeType?: string;
    publishUserId?: number;
    status?: string;
    title?: string;
  };

  /**
   * 新增/编辑通知公告
   */
  export async function save(data: SaveParams) {
    if ('id' in data && data.id) {
      return requestClient.put<SaveResult>(`/system/notification/${data.id}`, data);
    }
    return requestClient.post<SaveResult>('/system/notification', data);
  }

  /**
   * 查询通知公告列表
   */
  export async function findList(params: FindListParams) {
    return requestClient.get<ItemDto[]>('/system/notification', { params });
  }

  /**
   * 查询用户通知公告列表
   */
  export async function findListByUserId(params: FindListParams) {
    return requestClient.get<ItemDto[]>('/system/notification/user/list', { params });
  }

  /**
   * 查询未读通知公告
   */
  export async function findNotReadNotifications() {
    return requestClient.get<NotificationItem[]>('/system/notification/find/not-read');
  }
  /**
   * 根据id查询通知公告
   */
  export async function findById(id: string) {
    return requestClient.get<ItemDto>(`/system/notification/${id}`);
  }

  /**
   * 删除通知公告
   */
  export async function remove(id: string) {
    return requestClient.delete(`/system/notification/${id}`);
  }

  /**
   * 标记为已读
   * @param id 通知id
   */
  export async function markAsRead(id: string) {
    return requestClient.post(`/system/notification/update/read/${id}`);
  }

  /**
   * 标记所有为已读
   */
  export async function markAllRead() {
    return requestClient.post(`/system/notification/update-all/read`);
  }

  /**
   * 清除用户所有通知
   */
  export async function clearNotifications() {
    return requestClient.delete(`/system/notification/clear/user/all`);
  }

  /**
   * 删除用户通知
   * @param id 通知id
   */
  export async function deleteUserNotification(id: string) {
    return requestClient.delete(`/system/notification/user/${id}`);
  }
}
