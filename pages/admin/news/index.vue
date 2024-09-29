<template>
  <div>
    <Head>
      <Title>{{ app }} admin</Title>
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
        :data="filteredData"
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
  // get all news and filter by year
  //
  import { usePlacemarkStore } from '@/stores/placemarkStore'
  //
  definePageMeta({
    middleware: ['auth'],
  })

  // save places for return to table listing
  //
  //
  // Initialize values for Renderlist
  const app = 'news'
  const { getAccess } = useRenderListAccess()
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
  const placemark = usePlacemarkStore()
  const page = ref(placemark.getPage)

  //
  // Initialize year select dropdown
  //
  const year = ref(placemark.getYear)
  const startyear = 2004
  //
  // Select year action
  //
  const onYearSelect = function (value) {
    year.value = value
    placemark.setYear(year.value)
    // new year - set page to zero
    placemark.setPage(0)
    page.value = 0
  }
  //
  // Get news data
  //
  const { getAll, deleteOne, changeStatusOne } = useFetchAll()
  const { data: news } = await getAll(app)
  //
  // filter by year
  //
  const { $dayjs } = useNuxtApp()
  const filteredData = computed(() => {
    return news.value.filter((d) => {
      return parseInt($dayjs(d.dt).format('YYYY')) === year.value
    })
  })
  //
  // Renderlist actions
  //
  const deleteItem = async (id) => {
    await deleteOne(app, id)
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne(app, { id, status })
  }
</script>
