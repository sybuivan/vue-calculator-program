<template>
  <button
    :class="{
      number: true,
      active: selectedNumber === value,
    }"
    @click="handleClick"
    :disabled="disableNumber"
    :style="disableNumber && 'cursor: no-drop'"
  >
    {{ value }}
  </button>
</template>

<script>
export default {
  props: {
    value: Number,
    onClick: Function,
    selectedNumber: Number,
    disableNumber: Boolean,
  },
  methods: {
    handleClick() {
      this.onClick(this.value);
    },
  },
};
</script>
