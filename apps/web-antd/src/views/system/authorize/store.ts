import type { RoleApi } from '#/api';

import { Store } from '@tanstack/vue-store';

type Role = null | RoleApi.RoleDto;

type Actons = null | { [key: string]: string[] };

export const store = new Store<{ actions: Actons; role: Role }>({
  role: null,
  actions: null,
});

/**
 * 更新角色
 */
export function updateRole(role: Role) {
  store.setState((state) => {
    return {
      ...state,
      role: role ? { ...role } : null,
    };
  });
}

/**
 * 选择所有actions
 */
export function selectAllActions(actions: Actons) {
  store.setState((state) => {
    return {
      ...state,
      actions: actions ? { ...actions } : null,
    };
  });
}

/**
 * 清空actions
 */
export function clearActions() {
  store.setState((state) => {
    return {
      ...state,
      actions: null,
    };
  });
}

/**
 * 更新actions
 * @param moduleId 模块Id
 * @param actions actions
 */
export function updateActionsByModuleId(moduleId: string, actions: string[]) {
  store.setState((state) => {
    return {
      ...state,
      actions: {
        ...state.actions,
        [moduleId]: actions,
      },
    };
  });
}
