import type { RowType } from './types';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { onMounted } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { DepartmentApi, UserApi } from '#/api';

import EditPasswordForm from './edit-password-form.vue';
import Form from './form.vue';
import ResetPasswordForm from './reset-password-form.vue';

export const useHook = () => {
  const formOptions: VbenFormProps = {
    // 默认展开
    collapsed: false,
    fieldMappingTime: [['date', ['start', 'end']]],
    schema: [
      {
        component: 'Input',
        defaultValue: '',
        fieldName: 'keyword',
        label: '用户名称',
        componentProps: {
          allowClear: true,
        },
      },
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: [],
          placeholder: '请选择',
        },
        fieldName: 'departmentId',
        label: '所属部门',
      },
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: [
            {
              label: '启用',
              value: '1',
            },
            {
              label: '禁用',
              value: '0',
            },
          ],
          placeholder: '请选择',
        },
        fieldName: 'status',
        label: '有效状态',
      },
    ],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
  };

  const gridOptions: VxeTableGridOptions<RowType> = {
    columns: [
      { title: '序号', type: 'seq', width: 50 },
      { field: 'username', title: '用户名称' },
      { field: 'nickName', title: '昵称' },
      { field: 'realName', title: '姓名' },
      { field: 'phone', title: '电话' },
      { field: 'email', title: '邮箱' },
      { field: 'gender', title: '性别', slots: { default: 'gender' } },
      { field: 'isAdmin', title: '管理员', slots: { default: 'isAdmin' } },
      { field: 'department.name', title: '部门' },
      { field: 'status', title: '有效状态', slots: { default: 'status' } },
      {
        field: 'lastLoginAt',
        title: '最后登录时间',
        slots: { default: 'lastLoginAt' },
        width: 160,
      },
      { field: 'lastLoginIp', title: '最后登录IP' },
      { title: '操作', width: 300, slots: { default: 'action' } },
    ],
    data: [],
    pagerConfig: {
      enabled: true,
    },
    sortConfig: {
      multiple: false,
      remote: true,
    },
    border: true,
    stripe: true,
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page, sort }, formValues) => {
          return await UserApi.findList({
            page: page.currentPage,
            pageSize: page.pageSize,
            sortBy: sort.field,
            sortOrder: sort.order,
            ...formValues,
          });
        },
      },
      sort: true,
    },
    toolbarConfig: {
      search: true,
      refresh: true,
      zoom: true,
      custom: true,
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: '用户管理',
    formOptions,
    gridOptions,
  });

  const [FormModal, formModalApi] = useVbenModal({
    connectedComponent: Form,
    onClosed() {
      gridApi.reload();
    },
    class: 'w-[800px]',
  });

  const [ResetPasswordFormModal, resetPasswordFormModalApi] = useVbenModal({
    connectedComponent: ResetPasswordForm,
  });

  const [EditPasswordFormModal, editPasswordFormModalApi] = useVbenModal({
    connectedComponent: EditPasswordForm,
  });

  async function openForm(id?: number) {
    const row = id ? await UserApi.findById(id) : { status: 1 };
    formModalApi
      .setData({
        // 表单值
        values: { id, ...row },
      })
      .setState({
        title: `${id ? '编辑' : '新建'}用户`,
      })
      .open();
  }

  const handleCreate = () => {
    openForm();
  };

  const handleEdit = (id: number) => {
    openForm(id);
  };

  const handleDelete = async (id: number) => {
    message.loading({
      content: '正在提交中...',
      duration: 0,
      key: 'is-delete-user',
    });
    UserApi.deleteById(id)
      .then(() => {
        gridApi.reload();
        message.success({
          content: '删除成功',
          duration: 2,
          key: 'is-delete-user',
        });
      })
      .catch(() => {
        message.error({
          content: '删除失败',
          duration: 2,
          key: 'is-delete-role',
        });
      });
  };

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

  onMounted(async () => {
    const departmentRes = await DepartmentApi.findMany();

    gridApi.formApi.updateSchema([
      {
        fieldName: 'departmentId',
        componentProps: {
          options: departmentRes.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        },
      },
    ]);
  });

  return {
    Grid,
    FormModal,
    ResetPasswordFormModal,
    EditPasswordFormModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleResetPassword,
    handleEditPassword,
  };
};
