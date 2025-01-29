<script setup lang="ts">
import type { RoleApi } from '#/api';

import { h, onMounted, watch } from 'vue';

import { FluentSelectAll, FluentSelectNone, MdiContentSave } from '@vben/icons';

import { Button, CheckboxGroup } from 'ant-design-vue';

import { useHook } from './hook';

const { role } = defineProps<{
  role: null | RoleApi.RoleDto;
}>();

const { currentRole, values, Grid, gridApi, handleSelectAll, handleSelectNone } = useHook();

onMounted(() => {
  currentRole.value = role || null;
  gridApi.setState({
    tableTitle: role ? `${role.name} - 权限列表` : '权限列表',
  });
});

watch(
  () => role,
  (value) => {
    currentRole.value = value || null;
    gridApi.setState({
      tableTitle: value ? `${value.name} - 权限列表` : '权限列表',
    });
  },
);
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
