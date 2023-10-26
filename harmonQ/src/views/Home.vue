<script setup lang="ts">
import { ref } from 'vue';
import Menu from '../components/Menu.vue';

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
};
const hanc = (ww: any) => {
  console.log(ww);
};
</script>
<template>
  <div class="header">
    <div @click="update" style="cursor: pointer; background-color: #f5f5f5; display: flex; justify-content: space-between; align-items: center">
      <div>
        <span class="close-icon material-icons-outlined" style="font-size: 40px; margin-top: 8px">menu</span>
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

  <Menu :menu="AnaMenu" v-model:collapsed="collapsed" @item-click="hanc" vueRouterEnabel dark :autoCollapse="600" menuType="fully"></Menu>

  <router-view></router-view>
</template>

<style lang="scss">
.sidebar {
  width: 250px; /* Sidebar genişliği */
  height: 100vh; /* Sayfa yüksekliği kadar uzanır */
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333; /* Sidebar arka plan rengi */
  color: #fff; /* Sidebar metin rengi */
  z-index: 1; /* Sidebar'ı en üste getirir */
}

.menubar {
  position: fixed;
  top: 0;
  left: 250px;
  z-index: 0;
}

.custom-button {
  background-color: #f5f5f5;
  color: #fff;
  margin-left: 10px;
}

.close-icon {
  margin-left: -40px;
}

* {
  font-family: system-ui;
  font-size: 15px;
}
body {
  margin-left: 50px;
}
</style>
