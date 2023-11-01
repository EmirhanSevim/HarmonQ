<script setup lang="ts">
import { ref, computed } from 'vue';
import { createApp } from 'vue';

import Menu from '../Menu.vue';
const props = defineProps({
  isOpen: Boolean,
});
const AnaMenu: any = [
  {
    name: 'Genel Görünüm',
    icon: { class: 'material-icons-outlined', text: 'desktop_windows' },
    href: '/Home',
  },
  {
    name: 'Kartlar',

    icon: { class: 'material-icons-outlined', text: 'lens_blur' },
    children: [
      {
        icon: { class: 'material-icons-outlined', text: 'lens_blur' },
        href: '/Stoklar',
        name: 'Stoklar',
      },
      {
        icon: { class: 'material-icons-outlined', text: 'group' },
        href: '/',
        name: 'Müşteri & Tedarikçi',
      },
    ],
  },
];

const collapsed = ref(false);

const update = () => {
  collapsed.value = !collapsed.value;
  console.log('collapsed', collapsed.value);
};
const hanc = (ww: any) => {
  console.log(ww);
};
</script>
<template>
  <div class="header">
    <div style="cursor: pointer; background-color: #f5f5f5; display: flex; justify-content: space-between; align-items: center">
      <div>
        <span @click="update" class="close-icon material-icons-outlined" style="font-size: 40px; margin-top: 8px; margin-left: 15px">menu</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center">
        <button
          class="custom-button"
          :class="{ 'material-icons-outlined': true }"
          style="margin-top: 2px; margin-right: 10px; font-size: 20px; color: rgb(54, 54, 54); border: none"
        >
          palette
        </button>
        <button
          class="custom-button"
          :class="{ 'material-icons-outlined': true }"
          style="margin-top: 2px; margin-right: 10px; font-size: 20px; color: rgb(54, 54, 54); border: none"
        >
          language
        </button>
        <button
          class="custom-button"
          :class="{ 'material-icons-outlined': true }"
          style="margin-top: 2px; margin-right: 30px; font-size: 20px; color: rgb(54, 54, 54); border: none"
        >
          power_settings_new
        </button>
      </div>
    </div>
  </div>

  <Menu
    v-show="isOpen"
    style="padding: 4px; sm: ml -64px; margin-top: 5px; margin-right: 1rem"
    :menu="AnaMenu"
    v-model:collapsed="collapsed"
    @item-click="hanc"
    vueRouterEnabel
    dark
    :autoCollapse="600"
    menuType="fully"
  ></Menu>
  <div
    :class="{
      'p-5': true,
      'sm:ml-64': !collapsed,
      'bg-slate-50 dark:bg-slate-800': true,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.sidebar {
  min-width: 640px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  color: #fff;
}

.menubar {
  position: fixed;
  top: 0;
  left: 250px;
}

.custom-button {
  background-color: #f5f5f5;
  color: #fff;
  margin-left: 10px;
}

.close-icon {
  margin-right: 15px;
}

* {
  font-family: system-ui;
  font-size: 15px;
  margin-left: 4px;
}
body {
  margin-left: 50px;
}
</style>
