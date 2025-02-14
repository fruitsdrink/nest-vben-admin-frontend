<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { OnPenChangeCallbackProps } from '#/components';

import { ref } from 'vue';

import { DepartmentApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormDepartment',
});

const treeData = ref<DepartmentApi.DepartmentDto[]>([]);

const schema: VbenFormSchema[] = [
  {
    component: 'TreeSelect',
    componentProps: {
      allowClear: true,
      placeholder: '请选择上级部门',
      treeData,
      treeDefaultExpandAll: true,
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      treeLine: true,
    },
    fieldName: 'parentId',
    label: '上级部门',
    controlClass: 'w-full',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入部门名称',
      allowClear: true,
    },
    fieldName: 'name',
    label: '部门名称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入负责人',
      allowClear: true,
    },
    fieldName: 'leader',
    label: '负责人',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入电话',
      allowClear: true,
    },
    fieldName: 'phone',
    label: '电话',
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

const handleOnOpenChangeCallback = ({ modalApi }: OnPenChangeCallbackProps) => {
  const { departments } = modalApi.getData<{
    departments: DepartmentApi.DepartmentDto[];
    values: DepartmentApi.SaveParams;
  }>();

  treeData.value = departments;
};
</script>
<template>
  <NvaForm
    title="部门"
    :schema="schema"
    :save-api="DepartmentApi.save"
    :on-open-change-callback="handleOnOpenChangeCallback"
  />
</template>
