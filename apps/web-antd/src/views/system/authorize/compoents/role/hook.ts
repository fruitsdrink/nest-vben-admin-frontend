import { useQuery } from '@tanstack/vue-query';
import { useStore } from '@tanstack/vue-store';

import { RoleApi } from '#/api';

import { store, updateRole } from '../../store';

export const useHook = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['role-find-many'],
    queryFn: async () => {
      return RoleApi.findMany();
    },
  });

  const handleClick = (row: RoleApi.RoleDto) => {
    updateRole({ ...row });
  };

  const role = useStore(store, (state) => state.role);

  return {
    isPending,
    isError,
    data,
    error,
    role,
    handleClick,
  };
};
