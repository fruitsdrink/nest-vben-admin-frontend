import type { PageOptions } from './types';

import Page from './page.vue';

export const useHook = (options: PageOptions) => {
  const usePageHook = () => {
    return { title: options.title };
  };
  return { Page, usePageHook };
};
