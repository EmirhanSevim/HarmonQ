<template>
  <DxPopup
    v-model:visible="modalStore[props.uuid]"
    :drag-enabled="false"
    :hide-on-outside-click="true"
    :show-close-button="false"
    :show-title="true"
    :width="size.width"
    :height="size.height"
    container=".dx-viewport"
    :title="props.title"
  >
    <DxScrollView width="100%" height="100%" :element-attr="{ class: 'scrollable-modal-body' }" showScrollbar="always">
      <slot></slot>
    </DxScrollView>
    <DxToolbarItem
      widget="dxButton"
      :options="{
        text: '',
        icon: 'fullscreen',
        type: 'default',
        stylingMode: 'text',
        onClick: () => {
          if (size.height == '100vh') {
            size.height = '80vh';
            size.width = '80vw';
          } else {
            size.height = '100vh';
            size.width = '100vw';
          }
        },
      }"
      location="after"
    >
    </DxToolbarItem>
    <DxToolbarItem
      widget="dxButton"
      :options="{
        text: '',
        icon: 'close',
        type: 'danger',
        stylingMode: 'text',
        onClick: () => (modalStore[props.uuid] = false),
      }"
      location="after"
    >
    </DxToolbarItem>
  </DxPopup>
</template>

<script setup>
import { useModalStore } from '../stores/ModalStore';
import DxPopup, { DxToolbarItem } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import { ref } from 'vue';

const size = ref({ width: '80vw', height: '80vh' });

/* eslint-disable */
const props = defineProps({
  title: String,
  uuid: String,
});

const modalStore = useModalStore();
</script>

<style></style>
