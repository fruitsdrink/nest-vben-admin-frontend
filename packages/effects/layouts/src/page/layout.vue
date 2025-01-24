<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>
<template>
  <main class="p-4">
    <section v-if="slots.header">
      <slot name="header"></slot>
    </section>
    <section>
      <slot></slot>
    </section>
    <section v-if="slots.footer">
      <slot name="footer"></slot>
    </section>
  </main>
</template>
