<script setup lang="ts">
import { Page, useVbenModal } from '@vben/common-ui';

import { Card } from 'ant-design-vue';

import { EditAvatar, Profile } from './components';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: EditAvatar,
});

const handleOnEditAvatar = () => {
  formModalApi.open();
};
</script>

<template>
  <div>
    <Page auto-content-height>
      <div class="grid grid-cols-[352px_1fr] gap-4">
        <Profile @click="handleOnEditAvatar" />
        <Card title="基本资料">form</Card>
      </div>
    </Page>
    <FormModal />
  </div>
</template>
