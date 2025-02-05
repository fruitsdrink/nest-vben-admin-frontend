import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { DictDataApi, DictTypeApi } from '#/api';

import Form from './form.vue';

export const useHook = (dictTypeId: null | string) => {
  const currentDictTypeId = ref(dictTypeId);
  const dataTypeList = ref<{ label: string; value: string }[]>([]);

  onMounted(async () => {
    if (dictTypeId) {
      const res = await DictTypeApi.findMany();

      dataTypeList.value = res.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
  });

  const formOptions: VbenFormProps = {
    // 默认展开
    collapsed: false,
    fieldMappingTime: [['date', ['start', 'end']]],
    schema: [
      {
        component: 'Input',
        defaultValue: '',
        fieldName: 'keyword',
        label: '字典标签',
        componentProps: {
          allowClear: true,
        },
      },
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: dataTypeList,
          placeholder: '请选择',
        },
        fieldName: 'dictTypeId',
        label: '字典类型',
        defaultValue: currentDictTypeId.value,
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

  const gridOptions: VxeTableGridOptions<DictDataApi.ItemDto> = {
    columns: [
      { title: '序号', type: 'seq', width: 50 },
      { field: 'label', title: '字典标签' },
      { field: 'value', title: '字典键值' },
      { field: 'displayType', title: '回显类型', slots: { default: 'displayType' } },
      { field: 'dictType.name', title: '字典类型' },
      { field: 'sort', title: '排序编号' },
      { field: 'status', title: '有效状态', slots: { default: 'status' } },
      { title: '操作', width: 240, slots: { default: 'action' } },
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
          return await DictDataApi.findList({
            page: page.currentPage,
            pageSize: page.pageSize,
            sortBy: sort.field,
            sortOrder: sort.order,
            ...formValues,
            dictTypeId: currentDictTypeId.value,
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
    tableTitle: '字典数据',
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
    const row = id ? await DictDataApi.findById(id) : { status: 1 };
    formModalApi
      .setData({
        // 表单值
        values: { id, ...row },
        dictTypeId: currentDictTypeId.value,
      })
      .setState({
        title: `${id ? '编辑' : '新建'}字典数据`,
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
      key: 'is-delete-role',
    });
    DictDataApi.remove(id)
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

  return { Grid, FormModal, handleCreate, handleEdit, handleDelete };
};
