import type { PaginationParams } from '#/types';

import { requestClient } from '#/api/request';

export namespace PostApi {
  export interface PostDto {
    id: number;
    name: string;
    remark?: string;
    status?: 0 | 1;
    sort: number;
    createdAt: Date;
    creator: {
      id: number;
      name: string;
    };
  }

  export type SaveParams = Partial<PostDto>;
  export type SaveResult = PostDto;
  export type FindListParams = PaginationParams & {
    name?: string;
    status?: '0' | '1';
  };

  /**
   * 新增/编辑角色
   */
  export async function save(data: SaveParams) {
    if (data.id) {
      return requestClient.put<SaveResult>(`/baseinfo/post/${data.id}`, data);
    }
    return requestClient.post<SaveResult>('/baseinfo/post', data);
  }

  /**
   * 查询分页角色列表
   */
  export async function findList(params: FindListParams) {
    return requestClient.get<PostDto[]>('/baseinfo/post', { params });
  }

  /**
   * 查询所有角色
   */
  export async function findMany() {
    return requestClient.get<PostDto[]>('/baseinfo/post/find');
  }
  /**
   * 根据id查询角色
   */
  export async function findById(id: number) {
    return requestClient.get<PostDto>(`/baseinfo/post/${id}`);
  }

  /**
   * 删除角色
   */
  export async function deleteById(id: number) {
    return requestClient.delete(`/baseinfo/post/${id}`);
  }
}
