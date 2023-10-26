<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import vueAwesomeSidebar from 'vue-awesome-sidebar';
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css';
export default {
  name: 'App',
  components: {
    vueAwesomeSidebar,
  },
};
</script>
