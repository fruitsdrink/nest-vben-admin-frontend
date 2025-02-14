<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { OnPenChangeCallbackProps } from '#/components';

import { ref } from 'vue';

import { DictDataApi, DictTypeApi } from '#/api';
import { NvaForm } from '#/components';

defineOptions({
  name: 'FormDictData',
});

const currentDictTypeId = ref('');
const dataTypeList = ref<{ label: string; value: string }[]>([]);

const schema: VbenFormSchema[] = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典标签',
      allowClear: true,
    },
    fieldName: 'label',
    label: '字典标签',
    rules: 'required',
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入字典键值',
      allowClear: true,
    },
    fieldName: 'value',
    label: '字典键值',
    rules: 'required',
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: '请输入排序编号',
      allowClear: true,
    },
    fieldName: 'sort',
    label: '排序编号',
    rules: 'required',
    controlClass: 'w-full',
    defaultValue: 0,
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        { label: '默认', value: 0 },
        { label: '成功', value: 1 },
        { label: '处理中', value: 2 },
        { label: '失败', value: 3 },
        { label: '警告', value: 4 },
      ],
      placeholder: '请选择回显类型',
    },
    fieldName: 'displayType',
    label: '回显类型',
    rules: 'required',
    controlClass: 'w-full',
    defaultValue: 0,
  },
  {
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      placeholder: '请选择状态',
    },
    fieldName: 'status',
    label: '有效状态',
    rules: 'required',
    controlClass: 'w-full',
  },
  {
    component: 'Select',
    componentProps: {
      options: dataTypeList,
      placeholder: '请选择字典类型',
      disabled: true,
    },
    fieldName: 'dictTypeId',
    label: '字典类型',
    rules: 'required',
    controlClass: 'w-full',
    defaultValue: currentDictTypeId,
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: '请输入备注',
      allowClear: true,
    },
    fieldName: 'remark',
    label: '备注',
  },
];

const handleOnOpenChangeCallback = ({ modalApi }: OnPenChangeCallbackProps) => {
  const { dictTypeId } = modalApi.getData<{ dictTypeId: string; values: DictTypeApi.ItemDto }>();
  currentDictTypeId.value = dictTypeId ?? '';
};

const handleOnMoundedCallback = async () => {
  const res = await DictTypeApi.findMany();
  dataTypeList.value = res.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};
</script>
<template>
  <NvaForm
    title="字典数据"
    :schema="schema"
    :save-api="DictDataApi.save"
    :on-open-change-callback="handleOnOpenChangeCallback"
    :on-mounded-callback="handleOnMoundedCallback"
  />
</template>
