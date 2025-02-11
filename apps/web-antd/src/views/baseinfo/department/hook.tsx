import type { RowType } from './types';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { DepartmentApi } from '#/api';

import Form from './form.vue';

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
        label: '部门名称',
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
      { field: 'name', title: '部门名称', treeNode: true, align: 'left' },
      { field: 'leader', title: '负责人', width: 100 },
      { field: 'phone', title: '部门电话', width: 200 },
      { field: 'status', title: '有效状态', slots: { default: 'status' }, width: 100 },
      { title: '操作', width: 160, slots: { default: 'action' } },
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
          return await DepartmentApi.findList({
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
    treeConfig: {
      parentField: 'parentId',
      rowField: 'id',
      transform: true,
      expandAll: true,
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: '部门管理',
    formOptions,
    gridOptions,
  });

  const [FormModal, formModalApi] = useVbenModal({
    connectedComponent: Form,
    onClosed() {
      gridApi.reload();
    },
  });

  async function openForm(id?: string) {
    const row = id ? await DepartmentApi.findById(id) : { status: 1 };
    const departments = await DepartmentApi.findMany();
    formModalApi
      .setData({
        // 表单值
        values: { id, ...row },
        departments,
      })
      .setState({
        title: `${id ? '编辑' : '新建'}部门`,
      })
      .open();
  }

  const handleCreate = () => {
    openForm();
  };

  const handleEdit = (id: string) => {
    openForm(id);
  };

  const handleDelete = async (id: string) => {
    message.loading({
      content: '正在提交中...',
      duration: 0,
      key: 'is-delete-department',
    });
    DepartmentApi.deleteById(id)
      .then(() => {
        gridApi.reload();
        message.success({
          content: '删除成功',
          duration: 2,
          key: 'is-delete-department',
        });
      })
      .catch(() => {
        message.error({
          content: '删除失败',
          duration: 2,
          key: 'is-delete-department',
        });
      });
  };

  const expandAll = () => {
    gridApi.grid?.setAllTreeExpand(true);
  };

  const collapseAll = () => {
    gridApi.grid?.setAllTreeExpand(false);
  };

  return { Grid, FormModal, handleCreate, handleEdit, handleDelete, expandAll, collapseAll };
};
