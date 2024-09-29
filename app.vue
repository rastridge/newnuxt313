<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="10" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import { useMenuStore } from '~/stores/menuStore'
  const menuStore = useMenuStore()

  useHead({
    title: 'The Buffalo Rugby Club',
  })

  useSeoMeta({
    title: 'The Buffalo Rugby Club',
    // url: 'https://experimental--buffalorugbyorg.netlify.app/archives/news/html/1067',

    ogTitle: 'The Buffalo Rugby Club',
    description: 'News',
    ogDescription: 'News',
    // ogUrl:
    //   'https://experimental--buffalorugbyorg.netlify.app/archives/news/html/1067',
    ogImage: 'https://experimental--buffalorugbyorg.netlify.app//bflo_blue.png',
  })
  //
  // get custom menu items
  await menuStore.initCustomMenuItems()

  // stay logged in?
  /* 	if (localStorage.getItem('auth')) {
      	auth.loginAuto()
      } */
</script>

<style lang="scss">
  @use '~/assets/css/layout';
</style>
