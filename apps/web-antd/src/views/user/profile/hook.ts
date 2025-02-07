import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { UserApi } from '#/api';
import { useAuthStore } from '#/store';

export const useHook = () => {
  const { data } = useQuery<UserApi.Profile>({
    queryKey: ['profile'],
    queryFn: async () => {
      return await UserApi.profile();
    },
  });
  const queryClient = useQueryClient();
  const { fetchUserInfo } = useAuthStore();

  const handleOnUpdate = async () => {
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    await fetchUserInfo();
  };
  return { data, handleOnUpdate };
};
