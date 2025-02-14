<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';

import { DictTypeApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormDictType',
});

const schema: VbenFormSchema[] = [
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
];
</script>
<template>
  <NvaForm title="字典" :schema="schema" :save-api="DictTypeApi.save" />
</template>
