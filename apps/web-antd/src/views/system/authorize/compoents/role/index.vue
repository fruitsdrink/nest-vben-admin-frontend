<script setup lang="ts">
import type { RoleApi } from '#/api';

import { Alert, Card, Spin } from 'ant-design-vue';

import { useHook } from './hook';

defineEmits<{
  (e: 'click', role: RoleApi.RoleDto): void;
}>();

const { isPending, isError, data, currentId, handleClick } = useHook();
</script>

<template>
  <Card title="角色列表" class="absolute inset-0 flex flex-col">
    <div v-if="!isPending">
      <div
        v-for="item in data"
        :key="item.id"
        class="item cursor-pointer"
        :class="{ 'text-primary': item.id === currentId }"
        @click="
          () => {
            handleClick(item);
            $emit('click', item);
          }
        "
      >
        {{ item.name }}
      </div>
    </div>
    <div class="flex items-center justify-center" v-else><Spin /></div>
    <Alert message="发生错误了" type="error" show-icon v-if="isError" />
  </Card>
</template>

<style scoped>
.item {
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s;
}

.item:hover {
  font-weight: bold;
  color: hsl(var(--primary));
  background-color: hsl(var(--primary) / 10%);
}

:deep(.ant-card-head) {
  min-height: auto;
  padding: 0.6em 24px;
}

:deep(.ant-card-body) {
  flex: 1;
  padding: 8px;
  overflow: auto;
}
</style>
