import type { PageOptions } from './types';

export const usePage = (options: PageOptions) => {
  const { title } = options;
  return <div>{title}</div>;
};
