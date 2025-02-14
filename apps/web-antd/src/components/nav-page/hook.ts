import type { PageOptions } from './types';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

export const useHook = (options: PageOptions) => {
  const {
    title,
    'form-options': formOptions,
    'grid-options': gridOptions,
    api,
    'default-row-value': defaultRowValue,
    codes,
    form: Form,
  } = options;
  const defaultFormOptions: VbenFormProps = {
    // 默认展开
    collapsed: false,
    fieldMappingTime: [['date', ['start', 'end']]],
    schema: [],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
  };

  const defaultGridOptions: VxeTableGridOptions = {
    columns: [{ title: '操作', width: 200, slots: { default: 'action' } }],
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
          if (api && api.findList) {
            return await api.findList({
              page: page.currentPage,
              pageSize: page.pageSize,
              sortBy: sort.field,
              sortOrder: sort.order,
              ...formValues,
            });
          }
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

  const pageFormOptions: VbenFormProps = {
    ...defaultFormOptions,
    ...formOptions,
  };
  const pageGridOptions: VxeTableGridOptions = {
    ...defaultGridOptions,
    ...gridOptions,
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: title,
    formOptions: pageFormOptions,
    gridOptions: pageGridOptions,
  });

  const [FormModal, formModalApi] = useVbenModal({
    connectedComponent: Form,
    onClosed() {
      gridApi.reload();
    },
  });

  async function openForm(id?: number | string) {
    if (!api || !api.findById) {
      return;
    }
    const row = id ? await api.findById(id) : defaultRowValue;
    formModalApi
      .setData({
        // 表单值
        values: { id, ...row },
      })
      .setState({
        title: `${id ? '编辑' : '新建'}${title}`,
      })
      .open();
  }

  const handleCreate = () => {
    openForm();
  };

  const handleEdit = (id: any) => {
    openForm(id);
  };

  const handleDelete = async (id: number) => {
    if (!api || !api.deleteById) {
      return;
    }
    message.loading({
      content: '正在提交中...',
      duration: 0,
      key: 'is-delete-role',
    });
    api
      .deleteById(id)
      .then(() => {
        gridApi.reload();
        message.success({
          content: '删除成功',
          duration: 2,
          key: 'is-delete-role',
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

  const codeNew = codes?.new ?? [];
  const codeEdit = codes?.edit ?? [];
  const codeDelete = codes?.delete ?? [];
  return { Grid, FormModal, handleCreate, handleEdit, handleDelete, codeNew, codeEdit, codeDelete };
};
