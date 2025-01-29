<script setup lang="ts">
import { h, onUnmounted } from 'vue';

import { FluentSelectAll, FluentSelectNone, MdiContentSave } from '@vben/icons';

import { Button, CheckboxGroup } from 'ant-design-vue';

import { useHook } from './hook';

const { unmount, values, Grid, handleSelectAll, handleSelectNone } = useHook();

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
        <Button type="primary" :icon="h(MdiContentSave)">保存</Button>
      </div>
    </template>
    <template #actions="{ row }">
      <div class="flex flex-row justify-start">
        <CheckboxGroup :options="row.actions" v-model:value="values[row.id]" />
      </div>
    </template>
  </Grid>
</template>

<style scoped></style>
