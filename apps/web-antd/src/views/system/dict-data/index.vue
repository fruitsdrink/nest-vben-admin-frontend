<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Popconfirm, Tag } from 'ant-design-vue';

import { ButtonDelete, ButtonEdit, ButtonNew } from '#/components/buttons';

import { useHook } from './hook';

const router = useRouter();
const route = useRoute();

const dictTypeId = computed(() => (route.query.id as string) ?? '');

if (!dictTypeId.value) {
  router.push({ path: '/404' });
}
const { Grid, FormModal, handleCreate, handleEdit, handleDelete } = useHook(dictTypeId.value);
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <ButtonNew @click="handleCreate" :code="['baseinfo_role_add']" />
      </template>

      <template #displayType="{ row }">
        <Tag v-if="row.displayType === 0">默认</Tag>
        <Tag color="success" v-if="row.displayType === 1">成功</Tag>
        <Tag color="processing" v-if="row.displayType === 2">处理中</Tag>
        <Tag color="error" v-if="row.displayType === 3">失败</Tag>
        <Tag color="warning" v-if="row.displayType === 4">警告</Tag>
      </template>

      <template #status="{ row }">
        <Tag :color="row.status ? 'success' : 'error'">{{ row.status ? '启用' : '禁用' }}</Tag>
      </template>

      <template #action="{ row }">
        <ButtonEdit @click="handleEdit(row.id)" :disabled="!row.canEdit" :code="['baseinfo_role_edit']" />
        <Popconfirm title="确定删除吗?" @confirm="handleDelete(row.id)">
          <ButtonDelete :disabled="!row.canDelete" :code="['baseinfo_role_delete']" />
        </Popconfirm>
      </template>
    </Grid>
    <FormModal />
  </Page>
</template>
