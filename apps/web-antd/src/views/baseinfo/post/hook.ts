import type { PageOptions } from '#/components';

import { PostApi } from '#/api';
import { createInputSchema, createStatusSchema } from '#/components';

import Form from './form.vue';

export const useHook = () => {
  const pageOptions: PageOptions = {
    title: '岗位管理',
    formTitle: '岗位',
    formOptions: {
      schema: [createInputSchema({ title: '岗位名称', fieldName: 'name' }), createStatusSchema()],
    },
    gridOptions: {
      columns: [
        { title: '序号', type: 'seq', width: 50 },
        { field: 'name', title: '角色名称' },
        { field: 'sort', title: '排序编号' },
        { field: 'status', title: '有效状态', slots: { default: 'status' } },
        { field: 'creator.name', title: '创建人', width: 100 },
        { title: '操作', width: 200, slots: { default: 'action' } },
      ],
    },
    api: {
      findList: PostApi.findList,
      findById: PostApi.findById,
      deleteById: PostApi.deleteById,
    },
  };

  return { pageOptions, Form };
};
