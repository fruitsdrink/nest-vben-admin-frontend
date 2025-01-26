<script setup lang="ts">
import { Button } from 'ant-design-vue';

const { disabled, title } = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '删除',
  },
});
const emit = defineEmits(['click']);
</script>
<template>
  <Button
    type="link"
    :disabled="disabled"
    danger
    @click="
      () => {
        emit('click');
      }
    "
  >
    {{ title }}
  </Button>
</template>
