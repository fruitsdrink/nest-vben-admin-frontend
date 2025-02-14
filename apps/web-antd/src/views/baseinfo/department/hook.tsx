import type { PageOptions } from '#/components';

import { DepartmentApi } from '#/api';
import { createKeywordSchema, createStatusSchema } from '#/components';

import Form from './form.vue';

export const useHook = () => {
  const pageOptions: PageOptions = {
    title: '部门管理',
    formTitle: '部门',
    formOptions: {
      schema: [createKeywordSchema({ title: '部门名称' }), createStatusSchema()],
    },
    gridOptions: {
      columns: [
        { title: '序号', type: 'seq', width: 50 },
        { field: 'name', title: '部门名称', treeNode: true, align: 'left' },
        { field: 'leader', title: '负责人', width: 100 },
        { field: 'phone', title: '部门电话', width: 200 },
        { field: 'status', title: '有效状态', slots: { default: 'status' }, width: 100 },
        { field: 'creator.name', title: '创建人', width: 100 },
        { title: '操作', width: 160, slots: { default: 'action' } },
      ],
      treeConfig: {
        parentField: 'parentId',
        rowField: 'id',
        transform: true,
        expandAll: true,
      },
    },
    api: {
      findList: DepartmentApi.findList,
      findById: DepartmentApi.findById,
      deleteById: DepartmentApi.deleteById,
    },
    codes: {
      new: ['baseinfo_department_add'],
      edit: ['baseinfo_department_edit'],
      delete: ['baseinfo_department_delete'],
    },
    openFormExtraData: async (_: any) => {
      const departments = await DepartmentApi.findMany();
      return { departments };
    },
  };

  return { pageOptions, Form };
};
