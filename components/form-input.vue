<template>
  <div class="form-group">
    <label v-if="props.label" class="form-group__label">{{ label }}</label>
    <input 
      :value="modelValue"
      @input="updateValue"
      v-bind="attrs"
      :class="{ 'form-group__input_error': error }"
      class="form-group__input"
    />
    <span v-if="error" class="form-group__error">{{ errorMessage }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  }
})

const attrs = useAttrs();

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
}

const emit = defineEmits(['update:modelValue']);
</script>