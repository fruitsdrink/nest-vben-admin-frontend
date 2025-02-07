<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import { Profile } from './components';

defineOptions({
  name: 'Profile',
});
</script>

<template>
  <div>
    <Page auto-content-height>
      <div class="grid grid-cols-[352px_1fr] gap-4">
        <Profile />
        <Card title="基本资料">form</Card>
      </div>
    </Page>
  </div>
</template>
