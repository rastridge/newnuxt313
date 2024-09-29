<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitAdd } = useSubmit()

  // Sponsors form action
  //
  const onSubmit = async function (state) {
    await onSubmitAdd('history', state)
    navigateTo(`/admin/history`)
  }
</script>

<template>
  <div>
    <Head>
      <Title> Add history</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add history" />
      </div>
      <history-form @submitted="onSubmit" />
    </div>
  </div>
</template>
