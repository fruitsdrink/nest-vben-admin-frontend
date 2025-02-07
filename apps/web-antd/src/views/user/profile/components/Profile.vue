<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';
import {
  CarbonUserRole,
  IsiconTreeFilled,
  MdiAccount,
  MdiAdministrator,
  MdiEmail,
  MdiMobilePhone,
  MdiPlusThick,
  OpenMojiEuropenNameBadge,
} from '@vben/icons';

import { Card, Checkbox, Image } from 'ant-design-vue';

import { EditAvatar } from '.';

defineOptions({
  name: 'Profile',
});

const { data } = defineProps({
  data: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(['update']);

const [AvatarModal, avatarModalApi] = useVbenModal({
  connectedComponent: EditAvatar,
  async onClosed() {
    emits('update');
  },
});

const onAvatarClick = (data: Object) => {
  avatarModalApi
    .setData({
      values: {
        ...data,
      },
    })
    .open();
};
</script>

<template>
  <div>
    <Card title="个人信息" class="profile">
      <div class="flex w-full flex-row items-center justify-center py-4">
        <div class="avatar-container h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-full">
          <Image :preview="false" :src="data?.avatar" class="h-full w-full" />
          <div
            class="mask"
            @click="
              () => {
                onAvatarClick(data);
              }
            "
          >
            <MdiPlusThick width="24" height="24" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <MdiAccount />
          <span>用户名称</span>
        </div>
        <div class="value">{{ data?.username }}</div>
      </div>
      <div class="item">
        <div class="label">
          <OpenMojiEuropenNameBadge />
          <span>用户姓名</span>
        </div>
        <div class="value">{{ data?.realName }}</div>
      </div>
      <div class="item">
        <div class="label">
          <MdiMobilePhone />
          <span>联系电话</span>
        </div>
        <div class="value">{{ data?.phone }}</div>
      </div>
      <div class="item">
        <div class="label">
          <MdiEmail />
          <span>用户邮箱</span>
        </div>
        <div class="value">{{ data?.email }}</div>
      </div>
      <div class="item">
        <div class="label">
          <IsiconTreeFilled />
          <span>所属部门</span>
        </div>
        <div class="value">{{ data?.department?.name }}</div>
      </div>
      <div class="item">
        <div class="label">
          <CarbonUserRole />
          <span>用户角色</span>
        </div>
        <div class="flex flex-row flex-wrap items-center justify-end gap-2">
          <span v-for="role in data?.roles" :key="role.id">{{ role.name }}</span>
        </div>
      </div>
      <div class="item">
        <div class="label">
          <MdiAdministrator />
          <span>是否管理员</span>
        </div>
        <div class="value">
          <Checkbox :checked="data?.isAdmin ? true : false" />
        </div>
      </div>
    </Card>
    <AvatarModal />
  </div>
</template>

<style lang="scss" scoped>
.profile {
  .avatar-container {
    position: relative;

    &:hover {
      .mask {
        @apply flex;
      }
    }

    .mask {
      @apply absolute inset-0 flex hidden select-none flex-row items-center justify-center rounded-full bg-black/60;
    }
  }

  .item {
    @apply grid grid-cols-[100px_1fr] items-center justify-between gap-3 border-b-[1px] py-3;

    .label {
      @apply flex flex-row items-center justify-start gap-1;
    }

    .value {
      text-align: right;
    }
  }
}
</style>
