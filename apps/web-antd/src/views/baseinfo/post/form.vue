<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';

import { PostApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormPost',
});

const schema: VbenFormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入岗位名称',
      allowClear: true,
    },
    fieldName: 'name',
    label: '岗位名称',
    rules: 'required',
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
    defaultValue: 1,
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序编号',
      min: 0,
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
];
</script>
<template>
  <NvaForm title="岗位" :schema="schema" :save-api="PostApi.save" />
</template>
