<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { RoleApi } from '#/api';

defineOptions({
  name: 'FormRole',
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入角色名称',
        allowClear: true,
      },
      fieldName: 'name',
      label: '角色名称',
      rules: 'required',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '所有数据', value: 'All' },
          { label: '创建人', value: 'Self' },
          { label: '所属部门', value: 'Department' },
          { label: '所属部门及下属部门', value: 'DepartmentAndChildren' },
        ],
        placeholder: '请选择状态',
      },
      fieldName: 'dataAuth',
      label: '数据权限',
      rules: 'required',
      controlClass: 'w-full',
      defaultValue: 'All',
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
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序编号',
      },
      fieldName: 'sort',
      label: '排序编号',
      controlClass: 'w-full',
      rules: 'required',
      defaultValue: 0,
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
      const { values } = modalApi.getData<{ values: RoleApi.SaveParams }>();

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
  RoleApi.save({ ...values, id })
    .then(() => {
      modalApi.close();
      message.success({
        content: `${id ? '编辑' : '新增'}角色成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `${id ? '编辑' : '新增'}角色失败`,
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
