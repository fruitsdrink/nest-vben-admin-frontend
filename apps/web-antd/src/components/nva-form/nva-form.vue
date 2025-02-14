<script setup lang="ts">
import type { ExtendedFormApi, VbenFormSchema } from '@vben/common-ui';

import type { OnPenChangeCallbackProps } from './types';

import { onMounted } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'NvaForm',
});

const { schema, saveApi, title, onOpenChangeCallback, beforeConfirm, onMoundedCallback, wrapperClass } = defineProps<{
  beforeConfirm?: (formApi: ExtendedFormApi) => boolean | Promise<boolean>;
  onMoundedCallback?: (formApi: ExtendedFormApi) => Promise<void> | void;
  onOpenChangeCallback?: (opts: OnPenChangeCallbackProps) => void;
  saveApi: (...args: any) => Promise<any>;
  schema?: VbenFormSchema[];
  title?: string;
  wrapperClass?: string;
}>();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  wrapperClass: wrapperClass || '',
  schema,
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    if (beforeConfirm) {
      const res = await beforeConfirm(formApi);
      if (!res) {
        return;
      }
    }
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<{ values: any }>();

      if (onOpenChangeCallback) {
        onOpenChangeCallback({ isOpen, formApi, modalApi });
      }
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  overlayBlur: 5,
});

function onSubmit(values: Record<string, any>) {
  message.loading({
    content: '正在提交中...',
    duration: 0,
    key: 'is-form-submitting',
  });
  const id = modalApi.getData().values.id;
  values.sort = Number(values.sort);

  modalApi.lock();
  saveApi({ ...values, id })
    .then(() => {
      modalApi.close();
      message.success({
        content: `${id ? '编辑' : '新增'}${title}成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `${id ? '编辑' : '新增'}${title}失败`,
        duration: 2,
        key: 'is-form-submitting',
      });

      modalApi.setState({
        submitting: false,
      });
    });
}

onMounted(async () => {
  if (onMoundedCallback) {
    await onMoundedCallback(formApi);
  }
});
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
