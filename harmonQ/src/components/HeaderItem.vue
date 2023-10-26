<script setup>
import { inject } from 'vue';
const getSlots = inject('getSlotByName');

const headerSlot = getSlots('headerItem');
</script>

<template>
  <div>
    <!-- Use a conditional to render the header either as a component or a div -->
    <component v-if="headerSlot" :is="headerSlot" :header="data.header"></component>
    <div class="vsss-header" :class="data?.class ? data?.class : ''" v-bind="data?.attributes" v-else>
      {{ data.header }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
};
</script>
