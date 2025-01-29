import type { RoleApi } from '#/api';

import { ref } from 'vue';

import { Auth, Role } from './compoents';

export const useHook = () => {
  const currentRole = ref<null | RoleApi.RoleDto>(null);
  return {
    currentRole,
    Role,
    Auth,
  };
};
