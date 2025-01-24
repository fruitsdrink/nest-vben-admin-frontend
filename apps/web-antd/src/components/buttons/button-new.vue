<script setup lang="ts">
import { h } from 'vue';

import { MdiPlus } from '@vben/icons';

import { Button } from 'ant-design-vue';

const emit = defineEmits(['click']);
</script>
<template>
  <Button
    type="primary"
    :icon="h(MdiPlus)"
    @click="
      () => {
        emit('click');
      }
    "
  >
    新增
  </Button>
</template>
