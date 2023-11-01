<template>
  <form @submit="onSubmit" @reset="onReset" :initial-values="rowData">
    <div class="w-full border p- rounded-lg">
      <div style="margin-top: 10px" class="w-full flex flex-row justify-end align-center">
        <div class="flex">
          <span
            v-for="key in keys"
            :key="key"
            id="badge-dismiss-default"
            class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
          >
            {{ key + ':' + values[key] }}
            <button
              @click="setFieldValue(key, undefined)"
              type="button"
              class="inline-flex items-center p-0.5 ml-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg aria-hidden="true" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Remove badge</span>
            </button>
          </span>
          <button
            type="reset"
            class="p-1 hs-collapse-toggle inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold text-red-600 dark:text-red-600 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            id="hs-basic-collapse"
            data-hs-collapse="#hs-basic-collapse-heading"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
              ></path>
            </svg>
          </button>
          <button
            type="submit"
            class="p-1 hs-collapse-toggle inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold text-green-600 dark:text-green-400 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            id="hs-basic-collapse"
            data-hs-collapse="#hs-basic-collapse-heading"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </button>
          <button
            @click="accOpened = !accOpened"
            type="button"
            :class="{ 'rotate-180': accOpened }"
            class="p-1 hs-collapse-toggle inline-flex justify-start items-center gap-2 rounded-full border border-transparent font-semibold text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            id="hs-basic-collapse"
            data-hs-collapse="#hs-basic-collapse-heading"
          >
            <svg class="w-5 h-5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="hs-basic-collapse-heading"
        class="hs-collapse w-full overflow-hidden transition-[height] duration-300"
        :class="{ hidden: !accOpened }"
        aria-labelledby="hs-basic-collapse"
      >
        <hr class="h-px my-2 border-0 text-blue-800 bg-blue-800 rounded dark:bg-blue-300 dark:text-blue-300" />
        <div class="flex">
          <div class="w-1/3 p-1 font-semibold">
            Filtre-1
            <TextBox name="filter-1" />
          </div>
          <div class="w-1/3 p-1 font-semibold">
            Filtre-2
            <TextBox name="filter-2" />
          </div>
          <div class="w-1/3 p-1 font-semibold">
            Filtre-3
            <TextBox name="filter-3" />
          </div>
          <div class="w-1/3 p-1 font-semibold">
            Filtre-4
            <TextBox name="filter-4" />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import TextBox from './TextBox.vue';
import { useForm } from 'vee-validate';

const accOpened = ref(true);
const rowData = ref({});
const { handleSubmit, values, resetForm, setFieldValue } = useForm({
  validateOnMount: true,
  initialValues: rowData,
});

const onSubmit = handleSubmit((data) => {
  // Emit kullanmanıza gerek yok, burada veriyi işleyebilirsiniz.
  // emit("filter-submit", { ...data });
});

const keys = computed(() => {
  let tempKeys = Object.keys(values);

  return tempKeys.filter((x) => values[x]);
});

const onReset = () => {
  resetForm();
};
</script>

<style></style>
