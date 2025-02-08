<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Button, Popconfirm } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useHook } from './hook';

const { Grid, handleLogout } = useHook();
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools> </template>

      <template #lastLoginAt="{ row }">
        <div v-if="row.lastLoginAt">
          {{ dayjs(row.lastLoginAt).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </template>

      <template #action="{ row }">
        <Popconfirm title="确定强退吗?" @confirm="handleLogout(row.userId)">
          <Button type="link" danger>强退</Button>
        </Popconfirm>
      </template>
    </Grid>
  </Page>
</template>
