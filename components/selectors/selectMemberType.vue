<template>
  <div>
    <span class="font-semibold">Select Member Type</span>
    <Dropdown
      v-model="membertypeid"
      :options="memberTypeOptions"
      optionLabel="label"
      optionValue="value"
      class="w-10rem"
    />
  </div>
</template>

<script setup>
  // import { Dropdown } from 'floating-vue'

  //
  // Incoming
  //
  const props = defineProps({
    currenttype: {
      type: String,
      required: true,
    },
  })
  const membertypeid = ref(props.currenttype)

  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])

  //
  // Info for dropdown
  //
  const { getMemberTypeOptions } = useMembertypes()
  const memberTypeOptions = await getMemberTypeOptions()

  //
  // Watch for dropdown value change
  //
  watch(membertypeid, () => emit('submitted', membertypeid.value))
</script>
