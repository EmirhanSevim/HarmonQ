<template>
  <button
    type="button"
    class="text-white mt-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    @click="openModal"
  >
    + Ekle
  </button>
  <DxDataGrid
    ref="elementRef"
    class="mt-1 p-4"
    :data-source="store"
    :show-borders="true"
    :remote-operations="true"
    :height="'calc(100vh - 280px)'"
    @rowDblClick="openModal"
  >
    <DxColumn type="buttons" :width="110">
      <DxButton icon="edit" @click="openModal" />
      <DxButton name="delete" />
    </DxColumn>
    <DxColumn data-field="id" data-type="number" />
    <DxColumn data-field="kod" data-type="string" />
    <DxColumn data-field="ad" data-type="string" />
    <DxColumn data-field="tutar" data-type="string" />
    <DxColumn data-field="uuid" data-type="string" />
    <DxPaging :page-size="12" />
    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[8, 12, 20]" />
  </DxDataGrid>
</template>
<script setup>
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxButton } from 'devextreme-vue/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { useModalStore } from '../stores/ModalStore';
import { ref, defineProps, defineExpose } from 'vue';

const props = defineProps({
  uuid: String,
  //router: RouteLocationNormalized,
});

const elementRef = ref(null);
const testRef = ref({ aa: 'aa', bb: 'bb' });

const modalStore = useModalStore();

const openModal = () => {
  // router.replace("/home?id=75");
  modalStore[props.uuid] = true;
};

const store = new CustomStore({
  key: 'id',
  load(loadOptions) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [...Array(100).keys()].map((x) => ({
            id: x,
            kod: 'kod-' + x,
            ad: 'ad-' + x,
            tutar: Math.random() + 1000,
          })),
          totalCount: 100,
        });
      }, 150);
    })
      .then((data) => {
        return {
          data: data.data.slice(loadOptions.skip, loadOptions.skip + loadOptions.take),
          totalCount: data.totalCount,
        };
      })
      .catch(() => {
        throw new Error('Data Loading Error');
      });
  },
});

//eslint-disable-next-line
defineExpose({
  elementRef,
  testRef,
});
</script>
