<script setup lang="ts">
import { Tag } from 'ant-design-vue';

import NvaPage from '#/components/nva-page/NvaPage';

import { useHook } from './hook';

const {
  pageOptions: { title, codes, api, formOptions, gridOptions, defaultRowValue },
  Form,
} = useHook();
</script>

<template>
  <NvaPage
    :grid-options="gridOptions"
    :form-options="formOptions"
    :title="title"
    :codes="codes"
    :api="api"
    :default-row-value="defaultRowValue"
    :form="Form"
  >
    <template #status="{ row }">
      <Tag :color="row.status ? 'success' : 'error'">{{ row.status ? '启用' : '禁用' }}</Tag>
    </template>
  </NvaPage>
</template>
