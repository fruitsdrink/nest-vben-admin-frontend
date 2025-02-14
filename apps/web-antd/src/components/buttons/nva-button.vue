<script setup lang="ts">
import type { ButtonProps } from 'ant-design-vue';

import { Button } from 'ant-design-vue';

import { useAccessCode } from '#/hooks';

export type NvaButtonProps = ButtonProps & {
  code: Array<string>;
};
defineOptions({
  name: 'NvaButton',
});

const props = withDefaults(defineProps<NvaButtonProps>(), {
  code: () => [],
});

const { code, ...rest } = props;

const { hasAccess } = useAccessCode(code);
</script>

<template>
  <Button v-if="hasAccess" v-bind="rest">
    <slot></slot>
  </Button>
</template>
