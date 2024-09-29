<template>
  <div class="topsectioncenter">
    <div class="topsectionitem">
      <Common-header :title="video_data.video_title" />
    </div>
    <div class="text-center">
      <iframe
        width="568"
        height="315"
        :src="video_url"
        title="YouTube videoplayr"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script setup>
  import { getIdFromURL } from 'vue-youtube-embed'

  //
  // Get content id parameter
  //
  const route = useRoute()
  const video_id = ref(route.params.id)
  const video_url = ref('')
  //
  // Get video
  //
  const { data: video_data } = await useFetch('/videos/' + video_id.value, {
    method: 'get',
  })
  video_url.value = video_data.value.video_url

  if (video_url.value.includes('yout')) {
    video_url.value =
      'https://www.youtube.com/embed/' + getIdFromURL(video_url.value)
  } else {
    window.open(video_url.value)
  }
</script>
