<template>
  <div>
    <Head>
      <Title>Newsletters List</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>

      <div class="topsectionitem">
        <select-year
          :startyear="startyear"
          :currentyear="year"
          class="mb-3"
          @submitted="onYearSelect"
        />
      </div>
    </div>
    <div>
      <render-list
        :data="year_data"
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
  </div>
</template>

<script setup>
  //
  // get newsletters by year
  //
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  import delay from 'delay'
  //
  definePageMeta({
    middleware: ['auth'],
  })

  // initialize year selecct
  //
  const startyear = 2004

  //
  // Initialize values for Renderlist
  //
  const app = 'newsletters'
  const { getAccess } = useRenderListAccess()
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
  const placemark = usePlacemarkStore()
  const page = ref(placemark.getPage)
  const year = ref(placemark.getYear)

  //
  // Get newsletter data by year
  //
  const year_data = ref([])

  await delay(1000) // delay to let mysql query to take place ?
  const getYearOfNewsletters = async (year) => {
    const { data } = await useFetch(`/newsletters/year/${year}`, {
      method: 'get',
    })
    year_data.value = data.value
  }

  // initial page load
  //
  await getYearOfNewsletters(year.value)

  //  page load after year change
  //
  const onYearSelect = async function (value) {
    year.value = value
    // new year - set page to zero
    placemark.setPage(0)
    page.value = 0
    placemark.setYear(value)
    await getYearOfNewsletters(year.value)
  }
  //
  // Renderlist actions
  //
  const { deleteOne, changeStatusOne } = useFetchAll()
  const deleteItem = async (id) => {
    await deleteOne(app, id)
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne(app, { id, status })
  }
</script>
