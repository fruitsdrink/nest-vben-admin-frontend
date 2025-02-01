import type { RoleApi } from '#/api';

import { Store } from '@tanstack/vue-store';

import { AuthorizeApi } from '#/api';

type Role = null | RoleApi.RoleDto;

type Actions = null | { [key: string]: string[] };

export const store = new Store<{ actions: Actions; role: Role }>({
  role: null,
  actions: null,
});

/**
 * 更新角色
 */
export async function updateRole(role: Role) {
  let actions = null;
  if (role) {
    const res = await AuthorizeApi.findByRoleId(role.id);
    if (res.modules) {
      actions = {};
      res.modules.forEach((m: any) => {
        actions[m.moduleId] = m.actions ? [...m.actions] : [];
      });
    }
  }

  store.setState((state) => {
    return {
      ...state,
      role: role ? { ...role } : null,
      actions,
    };
  });
}

/**
 * 选择所有actions
 */
export function selectAllActions(actions: Actions) {
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
