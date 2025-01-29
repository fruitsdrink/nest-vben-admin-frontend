import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import { ref } from 'vue';

import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { useQuery } from '@tanstack/vue-query';
import { Effect, useStore } from '@tanstack/vue-store';

import { store } from '../../store';
import { modules } from './mock';

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

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['auth-list'],
    queryFn: () => {
      return modules;
    },
  });

  const gridOptions: VxeTableGridOptions<RowType> = {
    columns: [
      {
        title: '模块名称',
        field: 'moduleName',
        width: 200,
      },
      {
        title: '操作',
        field: 'actions',
        slots: {
          default: 'actions',
        },
      },
    ],
    data: modules,
    border: true,
    stripe: true,
    height: 'auto',
    pagerConfig: {
      enabled: false,
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: '权限设置',
    gridOptions,
  });

  const effect = new Effect({
    fn: () => {
      const role = useStore(store, (state) => state.role);

      if (role.value) {
        gridApi.setState({
          tableTitle: `${role.value.name} - 权限列表`,
        });
        gridApi.setGridOptions({
          data: modules,
        });
      } else {
        gridApi.setState({
          tableTitle: '权限列表',
        });
        gridApi.setGridOptions({
          data: [],
        });
      }
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
  };
};
