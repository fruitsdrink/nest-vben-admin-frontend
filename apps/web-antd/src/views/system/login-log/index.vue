<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Button, Tag } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useHook } from './hook';

const { Grid, handleDelete, handleClear } = useHook();
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <div class="flex items-center justify-between gap-2">
          <Button danger @click="handleDelete">删除</Button>
          <Button type="primary" danger @click="handleClear">清空</Button>
        </div>
      </template>
      <template #loginResult="{ row }">
        <Tag :color="row.loginResult ? 'success' : 'error'">{{ row.loginResult ? '成功' : '失败' }}</Tag>
      </template>

      <template #loginAt="{ row }">
        {{ dayjs(row.loginAt).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </Grid>
  </Page>
</template>
