import type { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface';

import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { Module } from '../../type';

import { onMounted } from 'vue';

import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { Effect, useStore } from '@tanstack/vue-store';

import { AuthorizeApi } from '#/api';

import { clearActions, selectAllActions, store, updateActionsByModuleId } from '../../store';

export type RowType = {
  actions: {
    label: string;
    value: string;
  }[];
  id: string;
  moduleName: string;
};

export const useHook = () => {
  const queryClient = useQueryClient();

  const actions = useStore(store, (state) => state.actions);

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
        clearActions();
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

    selectAllActions(newValues);
  };

  const handleSelectNone = () => {
    clearActions();
  };

  const handleRowSelectAll = (row: RowType) => {
    updateActionsByModuleId(
      row.id,
      row.actions.map((action) => action.value),
    );
  };

  const handleRowSelectNone = (row: RowType) => {
    updateActionsByModuleId(row.id, []);
  };

  const handleActionsChange = (moduleId: string, checkedValue: CheckboxValueType[]) => {
    updateActionsByModuleId(moduleId, checkedValue as string[]);
  };

  return {
    actions,
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
    handleActionsChange,
  };
};
