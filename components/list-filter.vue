<template>
<div class="filters">
  <FormInput label="startDate" v-model="filters.startDate" type="date"/>
  <FormInput label="endDate" v-model="filters.endDate" type="date"/>
</div>
</template>
<script setup lang="ts">
import { useListStore } from '~/stores/list';
const listStore = useListStore();

const { filters } = storeToRefs(listStore)
</script>