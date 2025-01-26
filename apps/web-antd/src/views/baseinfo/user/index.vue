<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Popconfirm, Tag } from 'ant-design-vue';

import { ButtonDelete, ButtonEdit, ButtonNew } from '#/components/buttons';

import { useHook } from './hook';

const { Grid, FormModal, handleCreate, handleEdit, handleDelete } = useHook();
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <ButtonNew @click="handleCreate" />
      </template>

      <template #status="{ row }">
        <Tag :color="row.status ? 'success' : 'error'">{{ row.status ? '启用' : '禁用' }}</Tag>
      </template>

      <template #gender="{ row }">
        {{ row.gender ? (row.gender === 1 ? '男' : '女') : '未知' }}
      </template>

      <template #isAdmin="{ row }">
        <Tag :color="row.isAdmin ? 'red' : 'default'">{{ row.isAdmin ? '是' : '否' }}</Tag>
      </template>

      <template #action="{ row }">
        <ButtonEdit @click="handleEdit(row.id)" :disabled="!row.canEdit" />
        <Popconfirm title="确定删除吗?" @confirm="handleDelete(row.id)">
          <ButtonDelete :disabled="!row.canDelete" />
        </Popconfirm>
        <Popconfirm title="确定重置密码吗?" @confirm="handleDelete(row.id)">
          <ButtonDelete title="重置密码" />
        </Popconfirm>
      </template>
    </Grid>
    <FormModal />
  </Page>
</template>
