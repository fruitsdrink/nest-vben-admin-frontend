<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Popconfirm, Tag } from 'ant-design-vue';

import { ButtonNew, LinkButtonDelete, LinkButtonEdit } from '#/components/buttons';

import { useNotification } from './hook';

defineOptions({
  name: 'Notification',
});

const { Grid, FormModal, handleCreate, handleEdit, handleDelete, formatDate } = useNotification();
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <ButtonNew @click="handleCreate" :code="['baseinfo_role_add']" />
      </template>

      <template #noticeType="{ row }">
        <Tag :color="!row.noticeType ? 'processing' : 'default'">{{ !row.noticeType ? '通知' : '公告' }}</Tag>
      </template>

      <template #publishTime="{ row }">
        {{ formatDate(row.publishTime) }}
      </template>

      <template #status="{ row }">
        <Tag :color="row.status ? 'success' : 'error'">{{ row.status ? '启用' : '禁用' }}</Tag>
      </template>

      <template #action="{ row }">
        <LinkButtonEdit @click="handleEdit(row.id)" :disabled="!row.canEdit" :code="['baseinfo_role_edit']" />
        <Popconfirm title="确定删除吗?" @confirm="handleDelete(row.id)">
          <LinkButtonDelete :disabled="!row.canDelete" :code="['baseinfo_role_delete']" />
        </Popconfirm>
      </template>
    </Grid>
    <FormModal />
  </Page>
</template>
