<script setup lang="ts">
import { watch } from 'vue';

import { MdiContentSave } from '@vben/icons';

import { Button, Card, message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { UserApi } from '#/api';

// import { UserApi } from '#/api';

defineOptions({
  name: 'ProfileForm',
});

const { data } = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(['update']);

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户姓名',
        allowClear: true,
      },
      fieldName: 'realName',
      label: '用户姓名',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入联系电话',
        allowClear: true,
      },
      fieldName: 'phone',
      label: '联系电话',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户邮箱',
        allowClear: true,
      },
      fieldName: 'email',
      label: '用户邮箱',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: '未知', value: 0 },
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
        placeholder: '请选择性别',
      },
      fieldName: 'gender',
      label: '性别',
      rules: 'required',
      controlClass: 'w-full',
      defaultValue: 0,
    },
  ],
  showDefaultActions: false,
});

watch(
  () => data,
  (val) => {
    formApi.setValues(val);
  },
  {
    immediate: true,
  },
);

function onSubmit(values: Record<string, any>) {
  message.loading({
    content: '正在提交中...',
    duration: 0,
    key: 'is-form-submitting',
  });

  UserApi.updateProfile({ ...values })
    .then(() => {
      emits('update');
      message.success({
        content: '更新成功',
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: '更新失败',
        duration: 2,
        key: 'is-form-submitting',
      });
    });
}

const handleSubmit = () => {
  formApi.submitForm();
};
</script>

<template>
  <Card title="基本资料">
    <Form />
    <div class="mt-4 flex flex-row justify-end">
      <Button type="primary" @click="handleSubmit">
        <MdiContentSave />
        <span>保存</span>
      </Button>
    </div>
  </Card>
</template>
