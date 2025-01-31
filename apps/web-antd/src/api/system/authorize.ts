import { requestClient } from '#/api/request';

export namespace AuthorizeApi {
  export async function findAll() {
    return requestClient.get('/system/permission');
  }
}
