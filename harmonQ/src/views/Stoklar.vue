<script setup>
import PageGrid from '../components/PageGrid.vue';
import PageFilter from '../components/PageFilter.vue';
import Home from './Home.vue';
import CustomModal from '../components/CustomModal.vue';
</script>
<template>
  <div class="stoklar">
    <div>
      <Home />
      <PageFilter />
      <PageGrid />
      <CustomModal />
    </div>
  </div>

  <router-view></router-view>
</template>

<style scoped></style>
