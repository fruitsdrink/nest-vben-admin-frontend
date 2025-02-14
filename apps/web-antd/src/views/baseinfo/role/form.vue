<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';

import { RoleApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormRole',
});

const schema: VbenFormSchema[] = [
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
  <NvaForm title="角色" :schema="schema" :save-api="RoleApi.save" />
</template>
