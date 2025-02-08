import type { VbenFormProps } from '@vben/common-ui';
import type { NotificationItem } from '@vben/layouts';
import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import { useRouter } from 'vue-router';

import { useVbenModal } from '@vben/common-ui';
import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { NotificationApi } from '#/api';

import Form from './form.vue';

export const useNotification = () => {
  const { data: notifications } = useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      return await NotificationApi.findNotReadNotifications();
    },
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const formOptions: VbenFormProps = {
    // 默认展开
    collapsed: false,
    fieldMappingTime: [['date', ['start', 'end']]],
    schema: [
      {
        component: 'Input',
        defaultValue: '',
        fieldName: 'title',
        label: '通知标题',
        componentProps: {
          allowClear: true,
        },
      },
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: [
            {
              label: '通知',
              value: '0',
            },
            {
              label: '公告',
              value: '1',
            },
          ],
          placeholder: '请选择',
        },
        fieldName: 'noticeType',
        label: '通知类型',
      },
      {
        component: 'Select',
        componentProps: {
          allowClear: true,
          options: [
            {
              label: '启用',
              value: '1',
            },
            {
              label: '禁用',
              value: '0',
            },
          ],
          placeholder: '请选择',
        },
        fieldName: 'status',
        label: '有效状态',
      },
    ],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
  };

  const gridOptions: VxeTableGridOptions<NotificationApi.ItemDto> = {
    columns: [
      { title: '序号', type: 'seq', width: 50 },
      { field: 'title', title: '通知标题' },
      { field: 'content', title: '通知内容' },
      { field: 'publishTime', title: '发布时间', slots: { default: 'publishTime' } },
      { field: 'noticeType', title: '通知类型', slots: { default: 'noticeType' } },
      { field: 'status', title: '有效状态', slots: { default: 'status' } },
      { title: '操作', width: 200, slots: { default: 'action' } },
    ],
    data: [],
    pagerConfig: {
      enabled: true,
    },
    sortConfig: {
      multiple: false,
      remote: true,
    },
    border: true,
    stripe: true,
    height: 'auto',
    proxyConfig: {
      ajax: {
        query: async ({ page, sort }, formValues) => {
          return await NotificationApi.findList({
            page: page.currentPage,
            pageSize: page.pageSize,
            sortBy: sort.field,
            sortOrder: sort.order,
            ...formValues,
          });
        },
      },
      sort: true,
    },
    toolbarConfig: {
      search: true,
      refresh: true,
      zoom: true,
      custom: true,
    },
  };

  const [Grid, gridApi] = useVbenVxeGrid({
    tableTitle: '通知公告',
    formOptions,
    gridOptions,
  });

  const [FormModal, formModalApi] = useVbenModal({
    connectedComponent: Form,
    onClosed() {
      gridApi.reload();
    },
  });

  async function openForm(id?: string) {
    const row = id ? await NotificationApi.findById(id) : { status: 1 };
    formModalApi
      .setData({
        // 表单值
        values: { id, ...row },
      })
      .setState({
        title: `${id ? '编辑' : '新建'}通知公告`,
      })
      .open();
  }

  const handleCreate = () => {
    openForm();
  };

  const handleEdit = (id: string) => {
    openForm(id);
  };

  const handleDelete = async (id: string) => {
    message.loading({
      content: '正在提交中...',
      duration: 0,
      key: 'is-delete-notification',
    });
    NotificationApi.remove(id)
      .then(() => {
        gridApi.reload();
        message.success({
          content: '删除成功',
          duration: 2,
          key: 'is-delete-notification',
        });
      })
      .catch(() => {
        message.error({
          content: '删除失败',
          duration: 2,
          key: 'is-delete-notification',
        });
      });
  };

  // 清空通知
  async function handleNoticeClear() {
    await NotificationApi.clearNotifications();
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }

  // 全部标记为已读
  async function handleMakeAll() {
    await NotificationApi.markAllRead();
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }

  // 点击通知
  async function handleItemClick(item: NotificationItem) {
    if ('id' in item && item.id) {
      await NotificationApi.markAsRead(item.id as string);
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  }
  // 查看全部
  function handleViewAll() {
    router.push('/system/notification-list');
  }

  function formatDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  return {
    Grid,
    FormModal,
    handleNoticeClear,
    handleEdit,
    handleDelete,
    handleCreate,
    handleMakeAll,
    handleItemClick,
    handleViewAll,
    formatDate,
    notifications,
  };
};
