<script setup lang="ts">
import { CarbonUserRole, IsiconTreeFilled, MdiAccount, MdiAdministrator, MdiEmail, MdiMobilePhone } from '@vben/icons';

import { Card, Checkbox, Image } from 'ant-design-vue';

defineOptions({
  name: 'Profile',
});
</script>

<template>
  <Card title="个人信息" class="profile">
    <div class="flex w-full flex-row items-center justify-center py-4">
      <Image
        :width="120"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        class="rounded-full"
      />
    </div>
    <div class="item">
      <div class="label">
        <MdiAccount />
        <span>用户名称</span>
      </div>
      <div class="value">admin</div>
    </div>
    <div class="item">
      <div class="label">
        <MdiMobilePhone />
        <span>电话号码</span>
      </div>
      <div class="value">13911111111</div>
    </div>
    <div class="item">
      <div class="label">
        <MdiEmail />
        <span>用户邮箱</span>
      </div>
      <div class="value">test@test.com</div>
    </div>
    <div class="item">
      <div class="label">
        <IsiconTreeFilled />
        <span>所属部门</span>
      </div>
      <div class="value">研发部门</div>
    </div>
    <div class="item">
      <div class="label">
        <CarbonUserRole />
        <span>用户角色</span>
      </div>
      <div class="flex flex-row flex-wrap items-center justify-end gap-2">
        <span>管理员1</span>
        <span>管理员2</span>
      </div>
    </div>
    <div class="item">
      <div class="label">
        <MdiAdministrator />
        <span>是否管理员</span>
      </div>
      <div class="value">
        <Checkbox checked />
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.profile {
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
