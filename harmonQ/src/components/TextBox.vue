<script setup>
/* eslint-disable */
import { useField } from 'vee-validate';
import DxTextBox from 'devextreme-vue/text-box';
import { computed } from 'vue';

const props = defineProps({
  name: String,
});

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  setValue,
} = useField(props.name, undefined, {
  //   initialValue: props.value,
});

const onChange = (e, c) => {
  setValue(e.event.target.value);
};
</script>

<template>
  <DxTextBox
    type="number"
    class="border"
    :value="inputValue"
    stylingMode="outlined"
    @input="onChange"
    :isValid="errorMessage ? false : true"
    :validationErrors="
      errorMessage
        ? [
            {
              type: 'custom',
              message: errorMessage,
            },
          ]
        : []
    "
    validationMessagePosition="bottom"
  />
  <!-- {{ errorMessage }} -->
</template>
