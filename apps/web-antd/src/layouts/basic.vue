<script lang="ts" setup>
import type { NotificationItem } from '@vben/layouts';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationLoginExpiredModal } from '@vben/common-ui';
import { useAppConfig, useWatermark } from '@vben/hooks';
import { ChangePassword, GgProfile } from '@vben/icons';
import { BasicLayout, LockScreen, Notification, UserDropdown } from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';

import { io, Socket } from 'socket.io-client';

import { useAuthStore } from '#/store';
import LoginForm from '#/views/_core/authentication/login.vue';
import { useHook } from '#/views/baseinfo/user/hook';
import { useNotification } from '#/views/system/notification/hook';

// const notifications = ref<NotificationItem[]>([
//   {
//     avatar: 'https://avatar.vercel.sh/vercel.svg?text=VB',
//     date: '3小时前',
//     isRead: true,
//     message: '描述信息描述信息描述信息',
//     title: '收到了 14 份新周报',
//   },
//   {
//     avatar: 'https://avatar.vercel.sh/1',
//     date: '刚刚',
//     isRead: false,
//     message: '描述信息描述信息描述信息',
//     title: '朱偏右 回复了你',
//   },
//   {
//     avatar: 'https://avatar.vercel.sh/1',
//     date: '2024-01-01',
//     isRead: false,
//     message: '描述信息描述信息描述信息',
//     title: '曲丽丽 评论了你',
//   },
//   {
//     avatar: 'https://avatar.vercel.sh/satori',
//     date: '1天前',
//     isRead: false,
//     message: '描述信息描述信息描述信息',
//     title: '代办提醒',
//   },
// ]);

/**
 * @description: 修改通知列表从后台获取
 * @author: haight
 */
const { notifications, handleMakeAll, handleNoticeClear, handleViewAll, handleItemClick } = useNotification();

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const { destroyWatermark, updateWatermark } = useWatermark();
const showDot = computed(() =>
  notifications && notifications.value ? notifications.value.some((item: NotificationItem) => !item.isRead) : false,
);
const router = useRouter();

const socket = ref<null | Socket>(null);

const { socketUrl } = useAppConfig(import.meta.env, import.meta.env.PROD);

const { EditPasswordFormModal, handleEditPassword } = useHook();

const menus = computed(() => [
  {
    handler: () => {
      handleProfile();
    },
    icon: GgProfile,
    text: '个人中心',
  },
  {
    handler: () => {
      handleEditPassword();
    },
    icon: ChangePassword,
    text: '修改密码',
  },
  // {
  //   handler: () => {
  //     openWindow(VBEN_GITHUB_URL, {
  //       target: '_blank',
  //     });
  //   },
  //   icon: MdiGithub,
  //   text: 'GitHub',
  // },
  // {
  //   handler: () => {
  //     openWindow(`${VBEN_GITHUB_URL}/issues`, {
  //       target: '_blank',
  //     });
  //   },
  //   icon: CircleHelp,
  //   text: $t('ui.widgets.qa'),
  // },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar ?? preferences.app.defaultAvatar;
});

const tag = computed(() => {
  return userStore.userInfo?.isAdmin ? '管理员' : '普通用户';
});

const email = computed(() => {
  return userStore.userInfo?.email;
});

async function handleLogout() {
  await authStore.logout(false);
}

// function handleNoticeClear() {
//   notifications.value = [];
// }

// function handleMakeAll() {
//   notifications.value.forEach((item) => (item.isRead = true));
// }

function handleProfile() {
  router.push('/user/profile');
}
watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);

const heartbeat = () => {
  if (socket.value) {
    const id = userStore.userInfo?.id;
    socket.value.emit('online-user', { id });
  }
};

let timer: null | ReturnType<typeof setInterval> = null;
onMounted(() => {
  socket.value = io(socketUrl);
  timer = setInterval(heartbeat, 10_000);
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.realName"
        :description="email"
        :tag-text="tag"
        @logout="handleLogout"
      />
    </template>
    <template #notification>
      <Notification
        :dot="showDot"
        :notifications="notifications"
        @clear="handleNoticeClear"
        @make-all="handleMakeAll"
        @view-all="handleViewAll"
        @read="handleItemClick"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal v-model:open="accessStore.loginExpired" :avatar>
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
  <EditPasswordFormModal />
</template>
