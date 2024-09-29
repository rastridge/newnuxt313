<template>
  <div class="my-header-style">
    {{ title.charAt(0).toUpperCase() + title.slice(1) }}
    <display-user-loggedin />
  </div>
</template>

<script setup>
  const props = defineProps({
    title: { type: String, required: true },
  })
</script>
