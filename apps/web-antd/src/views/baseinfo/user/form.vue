<script lang="ts" setup>
import type { ExtendedFormApi } from '@vben/common-ui';

import type { VbenFormSchema } from '#/adapter/form';
import type { OnPenChangeCallbackProps } from '#/components';

import { message } from 'ant-design-vue';

import { DepartmentApi, RoleApi, UserApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormUser',
});

const schema: VbenFormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户名称',
      allowClear: true,
    },
    fieldName: 'username',
    label: '用户名称',
    rules: 'required',
  },
  {
    component: 'InputPassword',
    componentProps: {
      placeholder: '请输入登录密码',
      allowClear: true,
    },
    fieldName: 'password',
    label: '登录密码',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户昵称',
      allowClear: true,
    },
    fieldName: 'nickName',
    label: '用户昵称',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入用户姓名',
      allowClear: true,
    },
    fieldName: 'realname',
    label: '用户姓名',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入联系电话',
      allowClear: true,
    },
    fieldName: 'phone',
    label: '联系电话',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入邮箱',
      allowClear: true,
    },
    fieldName: 'email',
    label: '邮箱',
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        { label: '未知', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
      placeholder: '请选择性别',
    },
    fieldName: 'gender',
    label: '性别',
    rules: 'required',
    controlClass: 'w-full',
    defaultValue: 0,
  },
  {
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      placeholder: '请选择部门',
      allowClear: true,
      treeDefaultExpandAll: true,
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      treeLine: true,
    },
    fieldName: 'departmentId',
    label: '所属部门',
    controlClass: 'w-full',
    dependencies: {
      required(values) {
        const { isAdmin } = values;
        return !isAdmin;
      },
      // 只有指定的字段改变时，才会触发
      triggerFields: ['isAdmin'],
    },
  },
  {
    component: 'Select',
    componentProps: {
      options: [],
      placeholder: '请选择角色',
      allowClear: true,
      mode: 'multiple',
    },
    fieldName: 'roles',
    label: '所属角色',
    controlClass: 'w-full',
    dependencies: {
      required(values) {
        const { isAdmin } = values;
        return !isAdmin;
      },
      // 只有指定的字段改变时，才会触发
      triggerFields: ['isAdmin'],
    },
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
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
      placeholder: '请选择是否管理员',
    },
    fieldName: 'isAdmin',
    label: '是否管理员',
    rules: 'required',
    controlClass: 'w-full',
    defaultValue: 0,
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
    // formItemClass: 'col-span-2 w-full',
  },
];

const beforeConfirm = async (formApi: ExtendedFormApi) => {
  const { isAdmin, departmentId, roles } = await formApi.getValues();
  if (!isAdmin && !departmentId) {
    message.error({
      content: '请选择所属部门',
      key: 'submit-error',
    });
    return false;
  }

  if (!isAdmin && (!roles || roles.length === 0)) {
    message.error({
      content: '请选择所属角色',
      key: 'submit-error',
    });
    return false;
  }
  return true;
};

const handleOnOpenChangeCallback = ({ modalApi, formApi }: OnPenChangeCallbackProps) => {
  const id = modalApi.getData().values.id;
  if (id) {
    // 编辑模式，去除密码字段
    formApi.removeSchemaByFields(['password']);
  }
};

const handleOnMoundedCallback = async (formApi: ExtendedFormApi) => {
  try {
    message.loading({
      content: '加载中...',
      duration: 0,
      key: 'is-loading',
    });
    const departmentRes = await DepartmentApi.findMany();
    const roleRes = await RoleApi.findMany();

    formApi.updateSchema([
      {
        fieldName: 'departmentId',
        componentProps: {
          treeDefaultExpandAll: true,
          treeData: departmentRes,
          fieldNames: {
            children: 'children',
            label: 'name',
            value: 'id',
          },
          treeLine: true,
        },
      },
      {
        fieldName: 'roles',
        componentProps: {
          options: roleRes.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        },
      },
    ]);
    message.destroy('is-loading');
  } catch {
    message.error({
      content: '加载失败',
      duration: 2,
      key: 'is-loading',
    });
  }
};
</script>
<template>
  <NvaForm
    title="用户"
    wrapper-class="grid grid-cols-2"
    :schema="schema"
    :save-api="UserApi.save"
    :before-confirm="beforeConfirm"
    :on-open-change-callback="handleOnOpenChangeCallback"
    :on-mounded-callback="handleOnMoundedCallback"
  />
</template>
