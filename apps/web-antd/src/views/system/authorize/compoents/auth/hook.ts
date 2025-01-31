import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { Module } from '../../type';

import { onMounted, ref } from 'vue';

import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { Effect, useStore } from '@tanstack/vue-store';

import { AuthorizeApi } from '#/api';

import { store } from '../../store';

export type RowType = {
  actions: {
    label: string;
    value: string;
  }[];
  id: number;
  moduleName: string;
};

export const useHook = () => {
  const values = ref<{
    [key: string]: string[];
  }>({});

  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery<Module[]>({
    queryKey: ['auth-list'],
    queryFn: async () => {
      const res = await AuthorizeApi.findAll();

      return res;
    },
  });

  const gridOptions: VxeTableGridOptions<RowType> = {
    columns: [
      {
        title: '模块名称',
        field: 'title',
        width: 200,
        resizable: true,
      },
      {
        title: '操作',
        field: 'actions',
        slots: {
          default: 'actions',
        },
      },
      {
        title: '',
        slots: {
          default: 'buttons',
        },
        width: 140,
      },
    ],
    data: [],
    border: true,
    stripe: true,
    height: 'auto',
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      resizable: true,
    },
    columnConfig: {
      resizable: true,
    },
    resizableConfig: {
      isDblclickAutoWidth: true,
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: '权限设置',
    gridOptions,
  });

  onMounted(() => {});

  const effect = new Effect({
    fn: () => {
      const role = useStore(store, (state) => state.role);
      if (role.value) {
        gridApi.setState({
          tableTitle: `${role.value.name} - 权限列表`,
        });
        gridApi.setGridOptions({
          data: data && data.value ? data.value : [],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ['auth-list'],
          exact: true,
          refetchType: 'all',
        });
        gridApi.setState({
          tableTitle: '权限列表',
        });
        gridApi.setGridOptions({
          data: [],
        });
      }

      values.value = {};
    },
    deps: [store],
    eager: true,
  });
  const unmount = effect.mount();

  const handleSelectAll = () => {
    const newValues: {
      [key: string]: string[];
    } = {};
    data.value?.forEach((item) => {
      newValues[item.id] = item.actions.map((action) => action.value);
    });

    values.value = newValues;
  };

  const handleSelectNone = () => {
    values.value = {};
  };

  const handleRowSelectAll = (row: RowType) => {
    values.value[row.id] = row.actions.map((action) => action.value);
  };

  const handleRowSelectNone = (row: RowType) => {
    values.value[row.id] = [];
  };

  return {
    values,
    isPending,
    isError,
    data,
    error,
    Grid,
    unmount,
    handleSelectAll,
    handleSelectNone,
    handleRowSelectAll,
    handleRowSelectNone,
  };
};
