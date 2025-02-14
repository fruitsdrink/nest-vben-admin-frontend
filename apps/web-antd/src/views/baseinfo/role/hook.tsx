import type { PageOptions } from '#/components';

import { RoleApi } from '#/api/baseinfo';
import { createKeywordSchema, createStatusSchema } from '#/components';

import Form from './form.vue';

export const useHook = () => {
  const pageOptions: PageOptions = {
    title: '角色管理',
    formTitle: '角色',
    formOptions: {
      schema: [createKeywordSchema({ title: '角色名称' }), createStatusSchema()],
    },
    gridOptions: {
      columns: [
        { title: '序号', type: 'seq', width: 50 },
        { field: 'name', title: '角色名称' },
        { field: 'status', title: '有效状态', slots: { default: 'status' } },
        { field: 'dataAuthName', title: '数据权限', width: 140 },
        { field: 'creator.name', title: '创建人', width: 100 },
        { title: '操作', width: 200, slots: { default: 'action' } },
      ],
    },
    api: {
      findList: RoleApi.findList,
      findById: RoleApi.findById,
      deleteById: RoleApi.deleteById,
    },
    codes: {
      new: ['baseinfo_role_add'],
      edit: ['baseinfo_role_edit'],
      delete: ['baseinfo_role_delete'],
    },
  };

  return { pageOptions, Form };
};
