<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { useHook } from './hook';

const { Role, Auth } = useHook();
</script>

<template>
  <Page auto-content-height>
    <div class="absolute bottom-4 left-4 top-4 w-[200px]">
      <Role />
    </div>
    <div class="absolute bottom-4 left-[232px] right-4 top-4 overflow-auto">
      <Auth />
    </div>
  </Page>
</template>
