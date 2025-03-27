<template>
  <main class="main">
    <slot />
  </main>
</template>

<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
    },
  ],
});
</script>

