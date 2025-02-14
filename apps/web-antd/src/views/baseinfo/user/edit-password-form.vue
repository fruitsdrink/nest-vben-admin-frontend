<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { UserApi } from '#/api';
import { useAuthStore } from '#/store';

defineOptions({
  name: 'FormDepartment',
});

const authStore = useAuthStore();

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入旧密码',
        allowClear: true,
      },
      fieldName: 'password',
      label: '当前密码',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '请输入新密码',
        allowClear: true,
      },
      fieldName: 'newPassword',
      label: '新密码',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      componentProps: {
        placeholder: '确认密码密码',
        allowClear: true,
      },
      fieldName: 'newPassword2',
      label: '确认密码',
      dependencies: {
        rules(values) {
          const { newPassword } = values;
          return z
            .string({ required_error: '请输入确认密码' })
            .min(1, { message: '请输入确认密码' })
            .refine((value) => value === newPassword, {
              message: '两次输入的密码不一致',
            });
        },
        triggerFields: ['newPassword'],
      },
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  title: '修改密码',
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validate();
    const values = await formApi.getValues();
    const password = values.password;

    try {
      const res = await UserApi.validatePassword(password);
      if (!res || !res.isok) {
        throw new Error('原登录密码错误');
      }

      formApi.submitForm();
    } catch {
      message.destroy();
      message.error({
        content: `原登录密码错误`,
        duration: 2,
        key: 'is-form-submitting',
      });
    }
    // await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<{ values: Parameters<typeof UserApi.editPassword>[0] }>();

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

  modalApi.lock();
  UserApi.editPassword({ password: values.password, newPassword: values.newPassword })
    .then(async () => {
      modalApi.close();
      message.success({
        content: `修改密码成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
      // 登出操作
      await authStore.logout(true);
    })
    .catch(() => {
      message.error({
        content: `修改密码失败`,
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
