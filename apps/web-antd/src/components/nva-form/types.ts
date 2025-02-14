import type { ExtendedFormApi, ExtendedModalApi } from '@vben/common-ui';

export type OnPenChangeCallbackProps = {
  formApi: ExtendedFormApi;
  isOpen: boolean;
  modalApi: ExtendedModalApi;
};
