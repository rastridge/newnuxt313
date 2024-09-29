<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      submit-label="Submit"
      @submit="submitForm(state)"
    >
      <FormKit
        type="text"
        label="Year"
        name="history_year"
        :disabled="year_disabled"
        validation="required|number|between:1965,2050"
        validation-visibility="live"
      />
      <div
        v-if="!goodyear"
        class="alert-danger"
      >
        Year {{ state.history_year }} already exists
      </div>

      <FormKit
        label="Playoffs"
        name="playoffs"
        type="textarea"
        value=""
      />

      <FormKit
        label="Outboud Tours"
        name="outbound_tours"
        type="textarea"
        value=""
      />
      <FormKit
        label="Inboud Tours"
        name="inbound_tours"
        type="textarea"
        value=""
      />
      <FormKit
        label="Other"
        name="other"
        type="textarea"
        value=""
      />
      <FormKit
        label="Upstate Tourney Location	"
        name="upstate_tourney_location"
        type="text"
        value=""
      />
      <FormKit
        label="Upstate Tourney Winner	"
        name="upstate_tourney_winner"
        type="text"
        value=""
      />

      <display-cancelform :destination="'/admin/history'" />
    </FormKit>

    <p v-if="saving">
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      ></ProgressBar>
      Saving ...
    </p>
  </div>
  <!-- </div> -->
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  const saving = ref(false)
  const year_disabled = ref(false)
  const years = ref([])

  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])
  //
  // Incoming
  //
  const props = defineProps({
    id: { type: String, default: '0' },
  })
  const edit_form = props.id !== '0'

  //
  // Initialize form
  //
  const state = ref({})

  const goodyear = computed(() => {
    const year = years.value.find(
      (u) => u.history_year == state.value.history_year,
    )
    return !year
  })
  //
  // edit if there is an id - add if not
  //
  if (edit_form) {
    // get opponent with id === props.id
    const { data } = await useFetch(`/history/${props.id}`, {
      key: props.id,
      method: 'get',
      headers: {
        authorization: auth.user.token,
      },
    })
    state.value = data.value
    // year exists - can't be changed
    year_disabled.value = true
  } else {
    const { data } = await useFetch(`/history/getyears`, {
      method: 'get',
      headers: {
        authorization: auth.user.token,
      },
    })
    years.value = data.value
  }

  //
  // form handlers
  //

  const submitForm = (state) => {
    saving.value = true
    emit('submitted', state)
  }
</script>
