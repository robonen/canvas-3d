<script setup lang="ts">
import {HTMLElementEvent} from '@/types/dom';

const {
  label,
  min,
  max,
  defaultValue,
  step = 0.1
} = defineProps<{ label: string, min: number, max: number, defaultValue: number, step?: number }>();

const emit = defineEmits<{
  (event: 'change', value: number): void
}>();

const value = ref<number>(defaultValue);

const onChange = (event: Event) => {
  const {target} = event as HTMLElementEvent<HTMLInputElement>;
  value.value = target.valueAsNumber;
  emit('change', value.value);
};
</script>

<template>
  <div class="block">
    <label class="label">
      {{ label }}
      <input :max="max" :min="min" :value="value" class="input" type="number" @input="onChange"/>
    </label>
    <div class="range">
      <div class="range__border">{{ min }}</div>
      <input :max="max" :min="min" :step="step" :value="value" class="range__input" type="range" @input="onChange"
             @dblclick="value = defaultValue"/>
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
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
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
  -webkit-appearance: none;
  flex: 1;
  height: 6px;
  border-radius: 4px;
  margin: 10px 0;
  background: #e2e4e6;
  transition: opacity .2s;

  &:hover, &:focus {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ff5c8e;
    cursor: pointer;
  }
}


</style>
