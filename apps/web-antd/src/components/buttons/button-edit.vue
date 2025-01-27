<script setup lang="ts">
import { Button } from 'ant-design-vue';

import { useAccessCode } from '#/hooks';

const { disabled, title, code } = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '编辑',
  },
  code: {
    type: Array<string>,
    default: [],
  },
});
const emit = defineEmits(['click']);

const { hasAccess } = useAccessCode(code);
</script>
<template>
  <Button
    type="link"
    :disabled="disabled"
    v-if="hasAccess"
    @click="
      () => {
        emit('click');
      }
    "
  >
    {{ title }}
  </Button>
</template>
