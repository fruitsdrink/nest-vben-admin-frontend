import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      title: '系统管理',
      icon: 'grommet-icons:system',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'PermissionManager',
        path: '/system/permission',
        component: () => import('#/views/system/permission/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'fa-solid:user-lock',
        },
      },
    ],
  },
];

export default routes;
