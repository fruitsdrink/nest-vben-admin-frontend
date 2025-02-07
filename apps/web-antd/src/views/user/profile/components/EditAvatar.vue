<script setup lang="ts">
import type { UploadProps } from 'ant-design-vue';
import type { UploadFile } from 'ant-design-vue/es/upload/interface';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { MdiPlusThick } from '@vben/icons';

import { Button, message, Upload } from 'ant-design-vue';

import { UserApi } from '#/api';
import defaultAvatar from '#/assets/images/avatar.png';

defineOptions({
  name: 'EditAvatar',
});

const userInfo = ref<UserApi.Profile>();
const fileList = ref<UploadProps['fileList']>([]);
const imgBase64 = ref<string>();

// function getBase64(img: Blob, callback: (base64Url: string) => void) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// }

// 创建函数，将导入的defaultAvatar转换为base64格式
function defaultAvatarToBase64() {
  const img = new Image();
  img.src = defaultAvatar;
  img.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      const base64Url = canvas.toDataURL('image/png');
      imgBase64.value = base64Url;
      fileList.value = [base64ToFile(base64Url)];
    }
  });
}

function getBase64FromFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const res = reader.result as string;
      resolve(res);
    });
  });
}

function base64ToFile(base64: string): UploadFile {
  const arr = base64.split(',');
  const mime = arr[0]!.match(/:(.*?);/)![1];
  const bstr = atob(arr[1]!);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.codePointAt(n)!;
  }
  const result = new File([u8arr], 'avatar.png', { type: mime }) as unknown as UploadFile;
  result.uid = `${Date.now()}`;
  return result;
}

const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
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
  imgBase64.value = await getBase64FromFile(file);
  return Upload.LIST_IGNORE;
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
      formData.append('id', userInfo.value?.id ? userInfo.value?.id.toString() : '');
      const res = await UserApi.uploadAvatar(formData);
      if (res && res.isok) {
        message.success('上传成功');
        fileList.value = [];
        imgBase64.value = '';
        modalApi.close();
      } else {
        message.error('上传失败');
      }
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

const handleOnClear = async () => {
  fileList.value = [];
  await defaultAvatarToBase64();
};
</script>

<template>
  <Modal>
    <div class="grid grid-rows-[1fr_auto] place-items-center gap-4 p-4">
      <div class="avatar relative h-[240px] w-[240px] overflow-hidden rounded-full">
        <img :src="imgBase64 || userInfo?.avatar" class="h-full w-full" />
        <div class="mask absolute inset-0 z-10 flex items-center justify-center bg-black/60" @click="handleOnClear">
          <MdiPlusThick width="64" height="64" class="rotate-45" />
        </div>
      </div>
      <div>
        <Upload
          :file-list="fileList"
          :multiple="false"
          :show-upload-list="false"
          :max-count="1"
          accept=".png,.jpg,.jpeg"
          :before-upload="beforeUpload"
        >
          <Button type="primary">选择头像</Button>
        </Upload>
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.avatar {
  .mask {
    display: none;
    cursor: pointer;
  }

  &:hover {
    .mask {
      display: flex;
    }
  }
}
</style>
