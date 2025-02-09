<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Button, Popconfirm, Tag } from 'ant-design-vue';

import { ButtonDelete, ButtonEdit, ButtonNew } from '#/components/buttons';

import { useHook } from './hook';

const { Grid, FormModal, handleCreate, handleEdit, handleDelete, expandAll, collapseAll } = useHook();
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="expandAll"> 展开全部 </Button>
        <Button type="primary" @click="collapseAll"> 折叠全部 </Button>
        <ButtonNew @click="handleCreate" :code="['baseinfo_department_add']" />
      </template>

      <template #status="{ row }">
        <Tag :color="row.status ? 'success' : 'error'">{{ row.status ? '启用' : '禁用' }}</Tag>
      </template>

      <template #action="{ row }">
        <ButtonEdit @click="handleEdit(row.id)" :disabled="!row.canEdit" :code="['baseinfo_department_edit']" />
        <Popconfirm title="确定删除吗?" @confirm="handleDelete(row.id)">
          <ButtonDelete :disabled="!row.canDelete" :code="['baseinfo_department_delete']" />
        </Popconfirm>
      </template>
    </Grid>
    <FormModal />
  </Page>
</template>
