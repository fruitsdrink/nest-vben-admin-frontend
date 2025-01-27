<script setup lang="ts">
import { h } from 'vue';

import { MdiPlus } from '@vben/icons';

import { Button } from 'ant-design-vue';

import { useAccessCode } from '#/hooks';

const props = withDefaults(
  defineProps<{
    code?: string[];
  }>(),
  {
    code: () => [],
  },
);

const emit = defineEmits(['click']);

const { hasAccess } = useAccessCode(props.code);
</script>
<template>
  <Button
    type="primary"
    :icon="h(MdiPlus)"
    v-if="hasAccess"
    @click="
      () => {
        emit('click');
      }
    "
  >
    新增
  </Button>
</template>
