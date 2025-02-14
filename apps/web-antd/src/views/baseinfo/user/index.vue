<script setup lang="ts">
import { Popconfirm, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';

import { NvaButton, NvaPage, RowTag } from '#/components';

import { useHook } from './hook';

const {
  pageOptions: {
    title,
    codes,
    api,
    formOptions,
    gridOptions,
    defaultRowValue,
    formTitle,
    onMountedCallback,
    formClass,
  },
  Form,
  ResetPasswordFormModal,
  handleResetPassword,
} = useHook();
</script>

<template>
  <NvaPage
    :grid-options="gridOptions"
    :form-options="formOptions"
    :title="title"
    :codes="codes"
    :api="api"
    :default-row-value="defaultRowValue"
    :form="Form"
    :form-title="formTitle"
    :form-class="formClass"
    :on-mounted-callback="onMountedCallback"
  >
    <template #status="{ row }">
      <RowTag :row="row" />
    </template>

    <template #isAdmin="{ row }">
      <Tag :color="row.isAdmin ? 'blue' : 'default'">{{ row.isAdmin ? '是' : '否' }}</Tag>
    </template>

    <template #lastLoginAt="{ row }">
      {{ row.lastLoginAt ? dayjs(row.lastLoginAt).format('YYYY-MM-DD HH:mm:ss') : '' }}
    </template>

    <template #action-after="{ row }">
      <Popconfirm title="确定重置密码吗?" @confirm="handleResetPassword(row.id, row.username)">
        <NvaButton :code="['baseinfo_user_resetPassword']" type="link"> 重置密码 </NvaButton>
      </Popconfirm>
    </template>

    <template #roles="{ row }">
      <Tag v-for="role in row.roles" :key="role.id">
        {{ role.name }}
      </Tag>
    </template>
    <ResetPasswordFormModal />
  </NvaPage>
</template>
