<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { RoleApi, UserApi } from '#/api';

defineOptions({
  name: 'FormDepartment',
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        allowClear: true,
        readonly: true,
      },
      fieldName: 'username',
      label: '用户名称',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入登录密码',
        allowClear: true,
      },
      fieldName: 'password',
      label: '登录密码',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请再次输入登录密码',
        allowClear: true,
      },
      fieldName: 'password2',
      label: '确认密码',
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: '请输入确认密码' })
            .min(1, { message: '请输入确认密码' })
            .refine((value) => value === password, {
              message: '两次输入的密码不一致',
            });
        },
        triggerFields: ['password'],
      },
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  title: '重置密码',
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
  const userId = modalApi.getData().values.userId;

  modalApi.lock();
  UserApi.resetPassword({ userId, password: values.password })
    .then(() => {
      modalApi.close();
      message.success({
        content: `重置密码成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `重置密码失败`,
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
