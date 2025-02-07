<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { NotificationApi } from '#/api';

defineOptions({
  name: 'FormNotification',
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入通知标题',
        allowClear: true,
      },
      fieldName: 'title',
      label: '通知标题',
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入通知内容',
        allowClear: true,
      },
      fieldName: 'content',
      label: '通知内容',
      rules: 'required',
    },
    {
      component: 'DatePicker',
      componentProps: {
        placeholder: '请选择发布时间',
        allowClear: true,
        // valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
      fieldName: 'publishTime',
      label: '发布时间',
      rules: 'required',
      controlClass: 'w-full',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '通知', value: 0 },
          { label: '公告', value: 1 },
        ],
        placeholder: '请选择类型',
      },
      fieldName: 'noticeType',
      label: '类型',
      rules: 'required',
      controlClass: 'w-full',
      defaultValue: 0,
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
      const { values } = modalApi.getData<{ values: NotificationApi.SaveParams }>();

      if (values) {
        values.publishTime = dayjs(values.publishTime) as any;
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

  modalApi.lock();
  NotificationApi.save({ ...values, id })
    .then(() => {
      modalApi.close();
      message.success({
        content: `${id ? '编辑' : '新增'}通知公告成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `${id ? '编辑' : '新增'}通知公告失败`,
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
