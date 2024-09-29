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
  // leaders form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('leaders', state)
    navigateTo(`/admin/leaders`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Leader</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit leaders" />
      </div>
      <leaders-form
        :id="id"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
