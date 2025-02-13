<script setup lang="ts">
import { onMounted } from 'vue';

import { Page } from '@vben/common-ui';

import { Popconfirm, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';

import { ButtonDelete, ButtonEdit, ButtonNew } from '#/components/buttons';

import { useHook } from './hook';

const {
  Grid,
  FormModal,
  ResetPasswordFormModal,
  handleCreate,
  handleEdit,
  handleDelete,
  handleResetPassword,
  handleOnMounted,
} = useHook();

onMounted(() => {
  handleOnMounted();
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <ButtonNew @click="handleCreate" :code="['baseinfo_user_add']" />
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

      <template #lastLoginAt="{ row }">
        {{ row.lastLoginAt ? dayjs(row.lastLoginAt).format('YYYY-MM-DD HH:mm:ss') : '' }}
      </template>

      <template #roles="{ row }">
        <Tag v-for="role in row.roles" :key="role.id">
          {{ role.name }}
        </Tag>
      </template>

      <template #action="{ row }">
        <ButtonEdit @click="handleEdit(row.id)" :disabled="!row.canEdit" :code="['baseinfo_user_edit']" />

        <Popconfirm title="确定删除吗?" @confirm="handleDelete(row.id)">
          <ButtonDelete :disabled="!row.canDelete" :code="['baseinfo_user_delete']" />
        </Popconfirm>

        <Popconfirm title="确定重置密码吗?" @confirm="handleResetPassword(row.id, row.username)">
          <ButtonDelete title="重置密码" :code="['baseinfo_user_resetPassword']" />
        </Popconfirm>
      </template>
    </Grid>
    <FormModal />
    <ResetPasswordFormModal />
  </Page>
</template>
