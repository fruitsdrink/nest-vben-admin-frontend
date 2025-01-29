import { ref } from 'vue';

import { useQuery } from '@tanstack/vue-query';

import { RoleApi } from '#/api';

export const useHook = () => {
  const currentId = ref(0);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['role-find-many'],
    queryFn: async () => {
      return RoleApi.findMany();
    },
  });

  const handleClick = (row: { id: number }) => {
    currentId.value = row.id;
  };

  return {
    isPending,
    isError,
    data,
    error,
    currentId,
    handleClick,
  };
};
