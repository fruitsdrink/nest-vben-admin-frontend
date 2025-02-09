<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { DepartmentApi } from '#/api';

defineOptions({
  name: 'FormDepartment',
});

const treeData = ref<DepartmentApi.DepartmentDto[]>([]);

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'TreeSelect',
      componentProps: {
        allowClear: true,
        placeholder: '请选择上级部门',
        treeData,
        treeDefaultExpandAll: true,
        fieldNames: {
          children: 'children',
          label: 'name',
          value: 'id',
        },
        treeLine: true,
      },
      fieldName: 'parentId',
      label: '上级部门',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入部门名称',
        allowClear: true,
      },
      fieldName: 'name',
      label: '部门名称',
      rules: 'required',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入负责人',
        allowClear: true,
      },
      fieldName: 'leader',
      label: '负责人',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入电话',
        allowClear: true,
      },
      fieldName: 'phone',
      label: '电话',
    },
    {
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入排序编号',
      },
      fieldName: 'sort',
      label: '排序编号',
      controlClass: 'w-full',
      rules: 'required',
      defaultValue: 0,
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
      const { values, departments } = modalApi.getData<{
        departments: DepartmentApi.DepartmentDto[];
        values: DepartmentApi.SaveParams;
      }>();
      treeData.value = departments;

      if (values) {
        formApi.setValues(values);
      }
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
  const id = modalApi.getData().values.id;
  values.sort = Number(values.sort);

  modalApi.lock();
  DepartmentApi.save({ ...values, id })
    .then(() => {
      modalApi.close();
      message.success({
        content: `${id ? '编辑' : '新增'}部门成功`,
        duration: 2,
        key: 'is-form-submitting',
      });
    })
    .catch(() => {
      message.error({
        content: `${id ? '编辑' : '新增'}部门失败`,
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
