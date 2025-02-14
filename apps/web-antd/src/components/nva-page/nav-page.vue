<script setup lang="tsx">
import type { PageOptions } from './types';

import { onMounted, useSlots } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Popconfirm } from 'ant-design-vue';

import { ButtonNew, LinkButtonDelete, LinkButtonEdit } from '#/components';

import { useHook } from './hook';

defineOptions({
  name: 'NvaPage',
});

const props = defineProps<PageOptions>();

const {
  Grid,
  FormModal,
  handleCreate,
  handleEdit,
  handleDelete,
  codeNew,
  codeEdit,
  codeDelete,
  expandAll,
  collapseAll,
  onMountedCallback,
  gridApi,
  formModalApi,
} = useHook(props);

const slots = useSlots() as any;

const editDisabled = (row: any) => {
  return row.canEdit !== null && row.canEdit === undefined ? row.canEdit : false;
};

const deleteDisabled = (row: any) => {
  return row.canDelete !== null && row.canDelete === undefined ? row.canDelete : false;
};

onMounted(() => {
  if (onMountedCallback) {
    onMountedCallback({ gridApi, formModalApi });
  }
});
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <div class="flex flex-row items-center gap-2">
          <Button @click="expandAll" type="default" v-if="props.gridOptions?.treeConfig"> 展开全部 </Button>
          <Button @click="collapseAll" type="default" v-if="props.gridOptions?.treeConfig"> 收起全部 </Button>
          <ButtonNew @click="handleCreate" :code="codeNew" />
        </div>
      </template>
      <template #action="{ row }">
        <slot name="action-before" :row="row"></slot>
        <LinkButtonEdit
          :code="codeEdit ?? undefined"
          :disabled="editDisabled(row)"
          @click="
            () => {
              handleEdit(row.id);
            }
          "
        />
        <Popconfirm @confirm="handleDelete(row.id)" title="确定删除吗?">
          <LinkButtonDelete :code="codeDelete ?? undefined" :disabled="deleteDisabled(row)" />
        </Popconfirm>
        <slot name="action-after" :row="row"></slot>
      </template>
      <template v-for="key in Object.keys(slots)" :key="key" #[key]="{ row }">
        <slot :name="key" :row="row"></slot>
      </template>
    </Grid>
    <FormModal />
    <slot></slot>
  </Page>
</template>
