<template>
  <div id="leaders">
    <Head>
      <Title>Buffalo Rugby Club History</Title>
    </Head>
    <div class="center-content">
      <common-header title="Club history" />
    </div>
    <div class="my-simple-card-style">
      <div class="my-datatable-wrapper-style">
        <DataTable
          :value="history"
          class="p-datatable-sm my-text-style"
          striped-rows
          showGridlines
          tableStyle="min-width: 50rem"
          paginator
          :rows="20"
        >
          <Column
            field="history_year"
            header="Year"
          ></Column>
          <Column
            field="playoffs"
            header="Playoffs"
          ></Column>
          <Column
            field="other"
            header="Other"
          ></Column>
          <Column
            field="inbound_tours"
            header="Inbound Tours"
          ></Column>
          <Column
            field="outbound_tours"
            header="Outbound Tours"
          >
          </Column>
          <Column
            field="upstate_tourney_location"
            header="Upstate Tourney Location"
          >
          </Column>
          <Column
            field="upstate_tourney_winner"
            header="Upstate Tourney Winner"
          >
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
  //
  // Get current news
  //
  const { data: history } = await useFetch('/history/getallcurrent', {
    method: 'get',
  })
</script>
