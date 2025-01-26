<script setup lang="ts">
import { Button } from 'ant-design-vue';

const { disabled, title } = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '编辑',
  },
});
const emit = defineEmits(['click']);
</script>
<template>
  <Button
    type="link"
    :disabled="disabled"
    @click="
      () => {
        emit('click');
      }
    "
  >
    {{ title }}
  </Button>
</template>
