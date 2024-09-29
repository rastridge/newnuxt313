<template>
  <div>
    <Head>
      <Title>Opponents List</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>
      <div class="topsectionitem">
        <Card style="width: 25em; margin-bottom: 1rem">
          <template #title> Find existing opponent</template>
          <template #content>
            <AutoComplete
              v-model="selectedOpponent"
              optionLabel="opponent_name"
              :suggestions="filteredOpponents"
              @complete="search_opponents"
              @item-select="setOpponent"
            />
          </template>
        </Card>
      </div>

      <div
        v-if="pending"
        class="topsectionitem"
      >
        Loading ...
      </div>
    </div>
    <div>
      <render-list
        :data="opponents_data"
        :page="page"
        :app="app"
        :statusable="statusable"
        :editable="editable"
        :deleteable="deleteable"
        :addable="addable"
        :viewable="viewable"
        @changeStatus="changeStatus"
        @deleteItem="deleteItem"
      />
    </div>
    <Dialog
      v-model:visible="visible"
      modal
      header="Can't do that"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">{{ message }}</span>

      <template #footer>
        <Button
          label="Continue"
          outlined
          autofocus
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })

  const placemark = usePlacemarkStore()

  const { getAll, deleteOne, changeStatusOne } = useFetchAll()
  const { getAccess } = useRenderListAccess()

  //
  // Initialize values for Renderlist
  //
  const app = 'opponents'
  const page = ref(placemark.getPage)

  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
  const { data: opponents_data, pending } = await getAll(app)

  //
  // Renderlist actions
  //
  const visible = ref(false)
  const message = ref('')
  const deleteItem = async (id) => {
    const msg = await deleteOne(app, id)
    if (msg.value) {
      message.value = msg.value
      visible.value = true
    }
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne(app, { id, status })
  }

  // Opponent name autocomplete
  //
  const suggestions_opponents = ref([])
  const filteredOpponents = ref([])
  const selectedOpponent = ref('')
  const setOpponent = () => {
    navigateTo(`/admin/opponents/${selectedOpponent.value.opponent_id}`)
  }

  const search_opponents = (event) => {
    if (!event.query.trim().length) {
      filteredOpponents.value = [...suggestions_opponents.value]
    } else {
      filteredOpponents.value = suggestions_opponents.value.filter(
        (suggestion) => {
          return (
            suggestion.opponent_name
              .toLowerCase()
              // .startsWith(event.query.toLowerCase())
              .includes(event.query.toLowerCase())
          )
        },
      )
    }
  }
  //
  const { data: opps_sug } = await useFetch(`/opponents/suggestions`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })
  suggestions_opponents.value = opps_sug.value
</script>
