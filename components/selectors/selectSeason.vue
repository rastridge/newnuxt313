<template>
  <div>
    <Dropdown
      v-model="year"
      :options="seasons"
      optionLabel="season"
      optionValue="year"
    />
  </div>
</template>

<script setup>
  //
  // Incoming
  //
  const props = defineProps({
    startyear: {
      type: Number,
      required: true,
    },
    currentyear: {
      type: Number,
      required: true,
    },
  })
  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])
  //
  // Info for dropdown
  //
  const { $dayjs } = useNuxtApp()
  const year = ref(props.currentyear)

  const seasons = computed(() => {
    {
      const thisyear = parseInt($dayjs().format('YYYY'))
      const temp = []
      for (let yr = props.startyear; yr <= thisyear; yr++) {
        temp.push({
          year: yr,
          season: yr + ' Fall  -> ' + (yr + 1) + ' Spring',
        })
      }
      return temp
    }
  })

  //
  // Watch for dropdown value change
  //
  watch(year, () => emit('submitted', year.value))
</script>
