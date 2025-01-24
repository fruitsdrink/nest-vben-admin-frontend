<script setup lang="ts">
import { Button } from 'ant-design-vue';

const { disabled } = defineProps({
  disabled: {
    type: Boolean,
    default: false,
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
    删除
  </Button>
</template>
