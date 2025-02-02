import { requestClient } from '#/api/request';

export namespace PermissionApi {
  export interface SaveDto {
    roleId: number;
    modules: {
      actions?: string[];
      moduleId: string;
    }[];
  }

  export async function findAll() {
    return requestClient.get('/system/permission');
  }

  export async function findByRoleId(roleId: number) {
    return requestClient.get(`/system/permission/role/${roleId}`);
  }

  export async function save(data: SaveDto) {
    return requestClient.post('/system/permission', data);
  }
}
