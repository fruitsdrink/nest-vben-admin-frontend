<script setup lang="ts">
import { Tag } from 'ant-design-vue';

defineOptions({
  name: 'RowTag',
});

const { row } = defineProps<{
  row: { status: number };
}>();
</script>

<template>
  <Tag :color="row.status ? 'success' : 'error'">{{ row.status ? '启用' : '禁用' }}</Tag>
</template>
