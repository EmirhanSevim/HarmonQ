<template>
  <div>
    <SideBar v-show="showSidebar" :is-open="showSidebar">
      <router-view></router-view>
    </SideBar>
  </div>
</template>

<script>
import vueAwesomeSidebar from 'vue-awesome-sidebar';
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css';
import SideBar from './components/layout/SideBar.vue';

export default {
  name: 'App',
  components: {
    vueAwesomeSidebar,
    SideBar,
  },
  data() {
    return {
      showSidebar: true,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'login') {
        this.showSidebar = false;
        console.log('showSidebar', this.showSidebar);
      } else {
        this.showSidebar = true;
      }
      console.log('showSidebar', this.showSidebar);
    },
  },
};
</script>

<style scoped>
.dx-toolbar {
  background-color: rgba(191, 191, 191, 0.15);
  padding: 5px 10px;
}

.dx-list-item-icon-container,
.dx-toolbar-before {
  width: 36px;
  padding-right: 0 !important;
  text-align: left;
}

.dx-list-item-content {
  padding-left: 40px !important;
  text-align: left !important;
}

.dx-button {
  background-color: rgba(191, 191, 191, -0.15);
  border: none;
}

.panel-list {
  height: 400px;
}

.dx-drawer-expand.dx-drawer-right .panel-list {
  float: right;
}

.panel-list .dx-list-item {
  color: #fff;
  border-top: 1px solid rgba(221, 221, 221, 0.2);
}

.panel-list .dx-list-item .dx-icon {
  color: #fff !important;
}

.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.options-container {
  display: flex;
  align-items: flex-start;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
  display: inline-block;
  margin-right: 50px;
}
.custom-list-item {
  color: white !important;
  font-size: 14pt !important;
  padding: 10px 11px 9px !important;
  text-align: left !important;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.custom-list-item:hover {
  background-color: rgba(77, 74, 74, 0.2);
}
.router-view {
  /* padding: 25px 25px 25px 25px; */
  min-width: calc(100vw - 288px);
  max-width: 100vw;
  width: 100%;
  min-height: calc(100vh - 88px);
}
.custom-drawer-container {
  display: flex;
  justify-content: flex-start;
}
.dx-drawer-content {
  max-width: 200px !important;
}
.dx-drawer-shrink .dx-drawer-wrapper {
  -webkit-box-flex: none !important;
  -ms-flex: none !important;
  flex: none !important;
  flex-direction: none !important;
  -ms-flex-direction: none !important;
  -webkit-box-orient: none !important;
}
.grid {
  margin-top: 20px; /* Grid'i aşağı kaydırmak için */
  margin-right: 20px; /* Grid'i sağa kaydırmak için */
}

.filter {
  margin-top: 20px; /* Filtreyi aşağı kaydırmak için */
  margin-right: 20px; /* Filtreyi sağa kaydırmak için */
}
</style>
