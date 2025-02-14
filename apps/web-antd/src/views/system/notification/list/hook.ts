import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import { ref } from 'vue';

import { useVbenVxeGrid } from '@vben/plugins/vxe-table';

import { useQueryClient } from '@tanstack/vue-query';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { NotificationApi } from '#/api';

export const useHook = () => {
  const queryClient = useQueryClient();
  const hasData = ref(false);

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
              label: '未读',
              value: '0',
            },
            {
              label: '已读',
              value: '1',
            },
          ],
          placeholder: '请选择',
        },
        fieldName: 'isRead',
        label: '已读状态',
      },
    ],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
  };

  const gridOptions: VxeTableGridOptions = {
    columns: [
      { title: '序号', type: 'seq', width: 50 },
      { field: 'notice.title', title: '通知标题' },
      { field: 'notice.content', title: '通知内容' },
      { field: 'notice.publishTime', title: '发布时间', slots: { default: 'publishTime' } },
      { field: 'notice.noticeType', title: '通知类型', slots: { default: 'noticeType' } },
      { field: 'isRead', title: '已读状态', slots: { default: 'status' } },
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
          const res = await NotificationApi.findListByUserId({
            page: page.currentPage,
            pageSize: page.pageSize,
            sortBy: sort.field,
            sortOrder: sort.order,
            ...formValues,
          });
          hasData.value = res.total > 0;

          return res;
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

  const handleDelete = async (id: string) => {
    message.loading({
      content: '正在提交中...',
      duration: 0,
      key: 'is-delete-notification',
    });
    NotificationApi.deleteUserNotification(id)
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
    gridApi.reload();
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }

  // 全部标记为已读
  async function handleMakeAll() {
    await NotificationApi.markAllRead();
    gridApi.reload();
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }

  // 点击通知
  async function handleItemClick(id: string) {
    await NotificationApi.markAsRead(id);
    gridApi.reload();
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }
  // 查看全部

  function formatDate(date: Date) {
    return dayjs(date).format('YYYY-MM-DD');
  }

  return {
    Grid,
    handleNoticeClear,
    handleDelete,
    handleMakeAll,
    handleItemClick,
    formatDate,
    hasData,
  };
};
