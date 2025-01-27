import { computed } from 'vue';

import { useAccess } from '@vben/access';

export function useAccessCode(code: string[]) {
  const { hasAccessByCodes } = useAccess();

  const hasAccess = computed(() => {
    if (code.length === 0) return true;
    return hasAccessByCodes(code);
  });

  return { hasAccess };
}
