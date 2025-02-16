import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { useAccessStore, useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { OnlineUserApi } from '#/api';

export const useHook = () => {
  const formOptions: VbenFormProps = {
    // 默认展开
    collapsed: false,
    fieldMappingTime: [['date', ['start', 'end']]],
    schema: [
      {
        component: 'Input',
        defaultValue: '',
        fieldName: 'username',
        label: '用户名称',
        componentProps: {
          allowClear: true,
        },
      },
    ],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
  };

  const gridOptions: VxeTableGridOptions<OnlineUserApi.ItemDto> = {
    columns: [
      { title: '序号', type: 'seq', width: 50 },
      { field: 'userName', title: '用户名称' },
      { field: 'realName', title: '用户姓名' },
      { field: 'departmentName', title: '部门名称' },
      { field: 'ip', title: 'ip地址' },
      { field: 'region', title: '登录地区' },
      { field: 'browser', title: '浏览器' },
      { field: 'os', title: '操作系统' },
      { field: 'lastLoginAt', width: 200, title: '最后登录时间', slots: { default: 'lastLoginAt' } },
      { title: '操作', width: 100, slots: { default: 'action' } },
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
          return await OnlineUserApi.findList({
            page: page.currentPage,
            pageSize: page.pageSize,
            sortBy: sort.field,
            sortOrder: sort.order,
            ...formValues,
          });
        },
      },
      sort: false,
    },
    toolbarConfig: {
      search: true,
      refresh: true,
      zoom: true,
      custom: true,
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: '在线用户',
    formOptions,
    gridOptions,
  });

  // socketStore.onLogout(() => {
  //   gridApi.reload();
  // });

  const handleLogout = async (id: number, token: string) => {
    message.loading({
      content: '正在提交中...',
      duration: 0,
      key: 'is-logout',
    });
    await OnlineUserApi.logout(id, token)
      .then(() => {
        gridApi.reload();
        message.success({
          content: '强退成功',
          duration: 2,
          key: 'is-logout',
        });
      })
      .catch(() => {
        message.error({
          content: '强退失败',
          duration: 2,
          key: 'is-logout',
        });
      });
  };

  const userStore = useUserStore();
  const accessStore = useAccessStore();

  return { Grid, handleLogout, userStore, accessStore };
};
