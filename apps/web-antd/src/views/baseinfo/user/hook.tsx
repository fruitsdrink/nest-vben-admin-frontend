import type { PageOptions } from '#/components';

import { useVbenModal } from '@vben/common-ui';

import { DepartmentApi, UserApi } from '#/api';
import { createKeywordSchema, createStatusSchema, createTreeSelect } from '#/components';

import EditPasswordForm from './edit-password-form.vue';
import Form from './form.vue';
import ResetPasswordForm from './reset-password-form.vue';

export const useHook = () => {
  const pageOptions: PageOptions = {
    title: '用户管理',
    formTitle: '用户',
    formOptions: {
      schema: [
        createKeywordSchema({ title: '用户名称' }),
        createTreeSelect({ title: '所属部门', fieldName: 'departmentId' }),
        createStatusSchema(),
      ],
    },
    gridOptions: {
      columns: [
        { title: '序号', type: 'seq', width: 50 },
        { field: 'username', title: '用户名称' },
        { field: 'nickName', title: '昵称' },
        { field: 'isAdmin', title: '管理员', slots: { default: 'isAdmin' } },
        { field: 'department.name', title: '部门' },
        { field: 'roles', title: '角色', slots: { default: 'roles' } },
        { field: 'status', title: '有效状态', slots: { default: 'status' } },
        { field: 'dataAuthName', title: '数据权限', width: 140 },
        {
          field: 'lastLoginAt',
          title: '最后登录时间',
          slots: { default: 'lastLoginAt' },
          width: 160,
        },
        { field: 'lastLoginIp', title: '最后登录IP' },
        { field: 'creator.name', title: '创建人', width: 100 },
        { title: '操作', width: 230, slots: { default: 'action' } },
      ],
    },
    formClass: 'w-[800px]',
    api: {
      findList: UserApi.findList,
      findById: UserApi.findById,
      deleteById: UserApi.deleteById,
    },
    codes: {
      new: ['baseinfo_user_add'],
      edit: ['baseinfo_user_edit'],
      delete: ['baseinfo_user_delete'],
    },
    onMountedCallback: async ({ gridApi }) => {
      const departmentRes = await DepartmentApi.findMany();

      gridApi.formApi.updateSchema([
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
      ]);
    },
  };

  const [ResetPasswordFormModal, resetPasswordFormModalApi] = useVbenModal({
    connectedComponent: ResetPasswordForm,
  });

  const [EditPasswordFormModal, editPasswordFormModalApi] = useVbenModal({
    connectedComponent: EditPasswordForm,
  });

  const handleResetPassword = (userId: number, username: string) => {
    resetPasswordFormModalApi
      .setData({
        values: { userId, username },
      })
      .setState({
        title: '重置密码',
      })
      .open();
  };

  const handleEditPassword = () => {
    editPasswordFormModalApi.open();
  };

  return { pageOptions, Form, ResetPasswordFormModal, EditPasswordFormModal, handleResetPassword, handleEditPassword };
};
