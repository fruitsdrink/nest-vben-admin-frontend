<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { DictTypeApi } from '#/api';

defineOptions({
  name: 'FormDictType',
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入字典名称',
        allowClear: true,
      },
      fieldName: 'name',
      label: '字典名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入字典编码',
        allowClear: true,
      },
      fieldName: 'code',
      label: '字典编码',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入备注',
        allowClear: true,
      },
      fieldName: 'remark',
      label: '备注',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
        placeholder: '请选择状态',
      },
      fieldName: 'status',
      label: '有效状态',
      rules: 'required',
      controlClass: 'w-full',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<{ values: DictTypeApi.ItemDto }>();

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
  const id = modalApi.getData().values.id as string;

  modalApi.lock();
  DictTypeApi.save({ ...values, id } as DictTypeApi.SaveDto)
    .then(() => {
      modalApi.close();
      message.success({
        content: `${id ? '编辑' : '新增'}字典成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `${id ? '编辑' : '新增'}字典失败`,
        duration: 2,
        key: 'is-form-submitting',
      });

      modalApi.setState({
        submitting: false,
      });
    });
}
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
