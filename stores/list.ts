import { defineStore } from 'pinia'
import type { Item, AuthStateFilters } from '~/types/types';

export const useListStore = defineStore('list', () => {
  const list = ref<Item[]>([]);
  const selectedIds = ref<number[]>([]);
  const filters = ref<AuthStateFilters>({
    startDate: '',
    endDate: '',
  });

  const getList = async () => {
    try {
      const res = await $fetch<Item[]>('/api/list/get');
      list.value = res;
    } catch (error) {
      return error;
    }
  };

  const filteredList = computed(() => {
    return list.value.filter((item: Item) => {
      const itemDate = new Date(item.date_created).getTime();
      const startDate = filters.value.startDate ? new Date(filters.value.startDate).getTime() : null;
      const endDate = filters.value.endDate ? new Date(filters.value.endDate).getTime() : null;

      const matchesStartDate = startDate ? itemDate >= startDate : true;
      const matchesEndDate = endDate ? itemDate <= endDate : true;

      return matchesStartDate && matchesEndDate;
    });
  });

  watch(() => filteredList.value, (newFilteredList) => {
    selectedIds.value = selectedIds.value.filter(id =>
      newFilteredList.some(item => item.id === id)
    );
  });

  return {
    list,
    selectedIds,
    filters,
    getList,
    filteredList,
  };
});