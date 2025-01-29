import type { RoleApi } from '#/api';

import { Store } from '@tanstack/vue-store';

type Role = null | RoleApi.RoleDto;

export const store = new Store<{ role: Role }>({
  role: null,
});

export function updateRole(role: Role) {
  store.setState((state) => {
    return {
      ...state,
      role: role ? { ...role } : null,
    };
  });
}
