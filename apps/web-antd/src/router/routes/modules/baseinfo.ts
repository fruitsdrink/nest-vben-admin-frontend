import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '基础信息',
      icon: 'carbon:gui-management',
    },
    name: 'BaseInfo',
    path: '/baseinfo',
    children: [
      {
        name: 'UserManager',
        path: '/baseinfo/user',
        component: () => import('#/views/baseinfo/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'lucide:user',
        },
      },
      {
        name: 'RoleManager',
        path: '/baseinfo/role',
        component: () => import('#/views/baseinfo/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'carbon:user-role',
        },
      },
      {
        name: 'DepartmentManager',
        path: '/baseinfo/department',
        component: () => import('#/views/baseinfo/department/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'mingcute:department-line',
        },
      },
    ],
  },
];

export default routes;
