<template>
  <div class="table-container">
    <ListFilter />
    <div>
      selectedIds: {{ selectedIds }}
    </div>
    <table v-if="listStore.filteredList.length" class="custom-table">
      <thead>
        <tr>
          <th><input type="checkbox" @change="toggleAll" v-model="allChecked" /></th>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Rarity</th>
          <th>Condition</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listStore.filteredList" :key="item.id">
          <td><input type="checkbox" v-model="selectedIds" :value="item.id" /></td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.category }}</td>
          <td>${{ item.price }}</td>
          <td>{{ item.rarity }}</td>
          <td>{{ item.condition }}</td>
          <td>{{ formatDate(item.date_created) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>no data</div>
  </div>
</template>

<script setup lang="ts">
import { type Item } from '~/types/types'
import { useListStore } from '~/stores/list';
import { formatDate } from '~/utils/date';

const listStore = useListStore();
await listStore.getList();

const { selectedIds } = storeToRefs(listStore);
const allChecked = ref(false);

const toggleAll = () => {
  if (allChecked.value) {
    selectedIds.value = listStore.filteredList.map((item: Item) => item.id);
  } else {
    selectedIds.value = [];
  }
};
</script>