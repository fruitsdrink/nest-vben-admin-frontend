<script setup lang="ts">
import { h, onUnmounted } from 'vue';

import { FluentSelectAll, FluentSelectNone, MdiContentSave } from '@vben/icons';

import { Button, CheckboxGroup } from 'ant-design-vue';

import { useHook } from './hook';

const {
  role,
  unmount,
  actions,
  Grid,
  mutation,
  handleSelectAll,
  handleSelectNone,
  handleRowSelectAll,
  handleRowSelectNone,
  handleActionsChange,
  handleSave,
} = useHook();

onUnmounted(() => {
  unmount();
});
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <div class="flex flex-row gap-2">
        <Button :icon="h(FluentSelectAll)" @click="handleSelectAll">选择全部</Button>
        <Button :icon="h(FluentSelectNone)" @click="handleSelectNone">取消选择</Button>
        <Button
          v-if="role && role.id"
          type="primary"
          :icon="h(MdiContentSave)"
          :disabled="!mutation.isPending"
          @click="handleSave"
        >
          保存
        </Button>
      </div>
    </template>
    <template #actions="{ row }">
      <div class="flex flex-row items-center justify-start">
        <CheckboxGroup
          :options="row.actions"
          :value="actions?.[row.id]"
          class="cell"
          @change="
            (checkedValue) => {
              handleActionsChange(row.id, checkedValue);
            }
          "
        />
      </div>
    </template>
    <template #buttons="{ row }">
      <Button
        size="small"
        type="link"
        @click="
          () => {
            handleRowSelectAll(row);
          }
        "
      >
        全选
      </Button>
      <Button
        size="small"
        type="link"
        @click="
          () => {
            handleRowSelectNone(row);
          }
        "
      >
        清空
      </Button>
    </template>
  </Grid>
</template>

<style scoped>
:deep(.ant-checkbox-group-item) {
  font-size: 13px;
}
</style>
