import { usePage } from '#/hooks';

export const useHook = () => {
  const Page = usePage({
    title: '岗位管理',
  });

  return { Page };
};
