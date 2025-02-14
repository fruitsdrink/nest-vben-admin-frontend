<script setup lang="ts">
import { NvaPage, RowTag } from '#/components';

import { useHook } from './hook';

const {
  pageOptions: { title, codes, api, formOptions, gridOptions, defaultRowValue, formTitle, openFormExtraData },
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
    :form-title="formTitle"
    :open-form-extra-data="openFormExtraData"
  >
    <template #status="{ row }">
      <RowTag :row="row" />
    </template>
  </NvaPage>
</template>
