<script setup>
  const props = defineProps({
    data: { type: Object, required: true },
  })
  const emit = defineEmits(['submitted'])

  // ref(props.data) if data is an object is passed by reference!
  const _data = ref({ ...props.data })
</script>

<template>
  <p>title in component = {{ _data }}</p>
  <form @submit.prevent="$event = emit('submitted', _data)">
    <fieldset>
      <label>title </label>
      <input
        id="title"
        v-model="_data.title"
      />
    </fieldset>
    <button
      type="submit"
      value="submit"
    >
      submit
    </button>
  </form>
</template>
