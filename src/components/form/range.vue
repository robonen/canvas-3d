<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string;
    min: number;
    max: number;
    currentValue: number;
    defaultValue: number;
    step?: number;
  }>(),
  {
    step: 0.1,
  }
);

const emit = defineEmits<{
  (event: 'change', value: number): void;
}>();

const value = ref<number>(props.currentValue);

const onChange = (event: Event) => {
  value.value = (event.target as HTMLInputElement).valueAsNumber;
  emit('change', value.value);
};

const reset = () => {
  value.value = props.defaultValue;
  emit('change', value.value);
};
</script>

<template>
  <div class="block">
    <label class="label">
      {{ label }}
      <input
        :max="max"
        :min="min"
        :value="value"
        class="input"
        type="number"
        @input="onChange"
      />
    </label>
    <div class="range">
      <div class="range__border">{{ min }}</div>
      <input
        :max="max"
        :min="min"
        :step="step"
        :value="value"
        class="range__input"
        type="range"
        @input="onChange"
        @click.middle="reset"
      />
      <div class="range__border">{{ max }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.block {
  display: flex;
  justify-content: space-between;
  column-gap: 12px;
}

.label {
  display: flex;
  column-gap: 4px;
  font-size: 18px;
  font-family: 'Computer Modern Serif', serif;
}

.input {
  flex: 1;
  font-family: 'Computer Modern Serif', serif;
  font-size: inherit;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type='number'] {
    appearance: textfield;
  }
}

.range {
  display: flex;
  align-items: center;
  column-gap: 14px;
  flex: 1;
}

.range__border {
  font-size: 12px;
  color: var(--seconary-color);
}

.range__input {
  appearance: none;
  flex: 1;
  height: 6px;
  border-radius: 4px;
  margin: 10px 0;
  background: #e2e4e6;
  transition: opacity 0.2s;

  &:hover,
  &:focus {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ff5c8e;
    cursor: pointer;
  }
}
</style>
