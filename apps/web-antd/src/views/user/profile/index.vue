<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Form, Profile } from './components';
import { useHook } from './hook';

defineOptions({
  name: 'Profile',
});

const { data, handleOnUpdate } = useHook();
</script>

<template>
  <div>
    <Page auto-content-height>
      <div class="grid grid-cols-[352px_1fr] gap-4">
        <Profile :data="data" @update="handleOnUpdate" />
        <Form :data="data" @update="handleOnUpdate" />
      </div>
    </Page>
  </div>
</template>
