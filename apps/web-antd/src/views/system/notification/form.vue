<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { OnPenChangeCallbackProps } from '#/components';

import dayjs from 'dayjs';

import { NotificationApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormNotification',
});

const schema: VbenFormSchema[] = [
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
];

const handleOnOpenChangeCallback = ({ modalApi }: OnPenChangeCallbackProps) => {
  const { values } = modalApi.getData<{ values: NotificationApi.SaveParams }>();
  if (values) {
    values.publishTime = dayjs(values.publishTime) as any;
  }
};
</script>
<template>
  <NvaForm
    title="通知公告"
    :schema="schema"
    :save-api="NotificationApi.save"
    :on-open-change-callback="handleOnOpenChangeCallback"
  />
</template>
