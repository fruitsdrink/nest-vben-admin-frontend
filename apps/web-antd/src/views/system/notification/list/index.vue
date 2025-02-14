<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Button, Popconfirm, Tag } from 'ant-design-vue';

import { LinkButtonDelete } from '#/components/buttons';

import { useHook } from './hook';

defineOptions({
  name: 'NotificationList',
});

const { Grid, handleDelete, formatDate, handleItemClick, handleMakeAll, handleNoticeClear, hasData } = useHook();
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <div class="flex gap-2" v-if="hasData">
          <Popconfirm title="确定标记已读吗?" @confirm="handleMakeAll">
            <Button type="primary">全部标记已读</Button>
          </Popconfirm>
          <Popconfirm title="确定删除吗?" @confirm="handleNoticeClear">
            <Button type="dashed" danger>删除全部</Button>
          </Popconfirm>
        </div>
      </template>

      <template #noticeType="{ row }">
        <Tag :color="!row.notice.noticeType ? 'processing' : 'default'">
          {{ !row.notice.noticeType ? '通知' : '公告' }}
        </Tag>
      </template>

      <template #publishTime="{ row }">
        {{ formatDate(row.notice.publishTime) }}
      </template>

      <template #status="{ row }">
        <Tag :color="row.isRead ? 'success' : 'default'">{{ row.isRead ? '已读' : '未读' }}</Tag>
      </template>

      <template #action="{ row }">
        <Button type="link" :disabled="row.isRead ? true : false" @click="() => handleItemClick(row.noticeId)">
          标记已读
        </Button>
        <Popconfirm title="确定删除吗?" @confirm="handleDelete(row.noticeId)">
          <LinkButtonDelete :disabled="!row.canDelete" :code="['baseinfo_role_delete']" />
        </Popconfirm>
      </template>
    </Grid>
  </Page>
</template>
