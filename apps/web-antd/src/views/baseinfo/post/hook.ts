import { RoleApi } from '#/api';
import { usePage } from '#/hooks';

export const useHook = () => {
  const Page = usePage({
    title: '岗位管理',
    gridOption: {
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
    },
  });

  return { Page };
};
