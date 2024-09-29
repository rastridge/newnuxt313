<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Get leader id
  //
  const route = useRoute()
  const id = route.params.id
  //
  // history form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('history', state)
    navigateTo(`/admin/history`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit History</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit history" />
      </div>
      <history-form
        :id="id"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
