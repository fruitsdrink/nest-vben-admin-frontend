<script setup lang="ts">
import type { UploadProps } from 'ant-design-vue';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, message, Upload } from 'ant-design-vue';

import { UserApi } from '#/api';

defineOptions({
  name: 'EditAvatar',
});

const userInfo = ref<UserApi.Profile>();
const fileList = ref<UploadProps['fileList']>([]);
const uploading = ref<boolean>(false);

// const headers = {
//   authorization: '',
// };

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error(`${file.name} 不是 png或 jpeg 格式的图片`);
    return false;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
    return false;
  }
  fileList.value = [file];
  return false;
};

const handleUpload = () => {
  if (!fileList.value || fileList.value.length === 0) {
    message.error('请上传头像');
    return;
  }
  const formData = new FormData();
  formData.append('file', fileList.value[0] as any);
};

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    // modalApi.close();
    if (!fileList.value || fileList.value.length === 0) {
      message.error('请上传头像');
    } else {
      const formData = new FormData();
      formData.append('file', fileList.value[0] as any);
      uploading.value = true;
    }
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<{ values: UserApi.Profile }>();

      if (values) {
        userInfo.value = values;
      }
    }
  },
  overlayBlur: 5,
});
</script>

<template>
  <Modal>
    <div class="grid grid-rows-[1fr_auto] place-items-center gap-4 p-4">
      <div class="h-[240px] w-[240px] overflow-hidden rounded-full">
        <img :src="userInfo?.avatar" class="h-full w-full" />
      </div>
      <div>
        <Upload
          :file-list="fileList"
          :multiple="false"
          :show-upload-list="false"
          :max-count="1"
          accept=".png"
          :before-upload="beforeUpload"
        >
          <Button type="primary" @click="handleUpload">上传头像</Button>
        </Upload>
      </div>
    </div>
  </Modal>
</template>
