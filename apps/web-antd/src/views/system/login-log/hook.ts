import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { LoginLogApi } from '#/api';

export const useHook = () => {
  const formOptions: VbenFormProps = {
    // 默认展开
    collapsed: false,
    fieldMappingTime: [['date', ['start', 'end']]],
    schema: [
      {
        component: 'Input',
        defaultValue: '',
        fieldName: 'ip',
        label: 'IP地址',
        componentProps: {
          allowClear: true,
        },
      },
      {
        component: 'Input',
        defaultValue: '',
        fieldName: 'username',
        label: '用户名',
        componentProps: {
          allowClear: true,
        },
      },
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: [
            {
              label: '成功',
              value: '1',
            },
            {
              label: '失败',
              value: '0',
            },
          ],
          placeholder: '请选择',
        },
        fieldName: 'status',
        label: '登录状态',
      },
    ],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
  };

  const gridOptions: VxeTableGridOptions<LoginLogApi.LoginLogItemDto> = {
    columns: [
      { field: 'id', title: '', width: 50, type: 'checkbox' },
      { title: '序号', type: 'seq', width: 50 },
      { field: 'userName', title: '用户名', width: 150 },
      { field: 'ip', title: 'IP地址', width: 150 },
      { field: 'address', title: '登录地址', width: 150 },
      { field: 'browser', title: '浏览器', width: 150 },
      { field: 'os', title: '操作系统', width: 150 },
      { field: 'loginResult', title: '登录状态', slots: { default: 'loginResult' } },
      { field: 'loginMessage', title: '提示信息', width: 150 },
      { field: 'loginAt', title: '登录时间', width: 200, slots: { default: 'loginAt' } },
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
          return await LoginLogApi.findList({
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
    tableTitle: '角色管理',
    formOptions,
    gridOptions,
  });

  const handleDelete = async () => {
    const res = gridApi.grid.getCheckboxRecords();
    if (res && res.length > 0) {
      try {
        const ids = res.map((item) => item.id);
        message.loading({
          content: '正在删除...',
          duration: 0,
          key: 'is-delete-login',
        });
        await LoginLogApi.remove({ ids });
        gridApi.reload();
        message.success({
          content: '删除成功',
          duration: 2,
          key: 'is-delete-login',
        });
      } catch {
        message.error({
          content: '删除失败',
          duration: 2,
          key: 'is-delete-login',
        });
      }
    }
  };

  const handleClear = async () => {
    try {
      message.loading({
        content: '正在清空...',
        duration: 0,
        key: 'is-clear-login',
      });

      await LoginLogApi.clear();
      gridApi.reload();
      message.success({
        content: '清空成功',
        duration: 2,
        key: 'is-clear-login',
      });
    } catch {
      message.error({
        content: '清空失败',
        duration: 2,
        key: 'is-clear-login',
      });
    }
  };
  return { Grid, gridApi, handleDelete, handleClear };
};
