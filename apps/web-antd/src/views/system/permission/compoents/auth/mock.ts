export const modules = [
  {
    id: 1,
    moduleName: '基础信息/用户管理',
    actions: [
      {
        value: 'add',
        label: '新增',
      },
      {
        value: 'edit',
        label: '编辑',
      },
      {
        value: 'delete',
        label: '删除',
      },
      {
        value: 'rest-password',
        label: '重置密码',
      },
    ],
  },
  {
    id: 2,
    moduleName: '基础信息/角色管理',
    actions: [
      {
        value: 'add',
        label: '新增',
      },
      {
        value: 'edit',
        label: '编辑',
      },
      {
        value: 'delete',
        label: '删除',
      },
    ],
  },
  {
    id: 3,
    moduleName: '基础信息/部门管理',
    actions: [
      {
        value: 'add',
        label: '新增',
      },
      {
        value: 'edit',
        label: '编辑',
      },
      {
        value: 'delete',
        label: '删除',
      },
    ],
  },
];

export const mockData = Array.from({ length: 100 })
  .fill(0)
  .map((_, i) => {
    return {
      id: i + 1,
      moduleName: `模块名称${i + 1}`,
      actions: [
        {
          code: 'add',
          name: '新增',
        },
        {
          code: 'edit',
          name: '编辑',
        },
        {
          code: 'delete',
          name: '删除',
        },
        {
          code: 'rest-password',
          name: '重置密码',
        },
      ],
    };
  });
