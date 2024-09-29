<script setup>
  const data = ref({ title: 'my novel' })
</script>

<template>
  <div>
    <p>title in parent = {{ data }}</p>
    <testvmodel
      :data="data"
      @submitted="($event) => (data = $event)"
    />
  </div>
</template>
