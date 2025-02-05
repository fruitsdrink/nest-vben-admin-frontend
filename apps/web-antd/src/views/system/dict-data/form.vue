<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { DictDataApi, DictTypeApi } from '#/api';

defineOptions({
  name: 'FormDictData',
});

const currentDictTypeId = ref('');
const dataTypeList = ref<{ label: string; value: string }[]>([]);

onMounted(async () => {
  const res = await DictTypeApi.findMany();
  dataTypeList.value = res.map((item) => ({
    label: item.name,
    value: item.id,
  }));
});

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
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
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.validateAndSubmitForm();
    // modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values, dictTypeId } = modalApi.getData<{ dictTypeId: string; values: DictTypeApi.ItemDto }>();

      if (values) {
        formApi.setValues(values);
      }

      currentDictTypeId.value = dictTypeId ?? '';
    }
  },
  overlayBlur: 5,
});

function onSubmit(values: Record<string, any>) {
  message.loading({
    content: '正在提交中...',
    duration: 0,
    key: 'is-form-submitting',
  });
  const id = modalApi.getData().values.id as string;

  modalApi.lock();
  DictDataApi.save({ ...values, id } as DictDataApi.SaveDto)
    .then(() => {
      modalApi.close();
      message.success({
        content: `${id ? '编辑' : '新增'}字典数据成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `${id ? '编辑' : '新增'}字典数据失败`,
        duration: 2,
        key: 'is-form-submitting',
      });

      modalApi.setState({
        submitting: false,
      });
    });
}
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
