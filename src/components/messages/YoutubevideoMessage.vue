<template>
  <div class="twc_youtubevideo">
    <iframe
      :src="videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'YoutubevideoMessage',
  props: {
    message: {
      type: Object,
      required: true,
      validator: (message) => {
        return (
          message &&
          message.type === 'youtubevideo' &&
          message.data &&
          message.data.video_url
        );
      },
    },
  },
  computed: {
    videoUrl() {
      return this.message.data.video_url;
    },
  },
};
</script>

<style>
.twc_youtubevideo {
  width: 100%;
  margin-right: 40px;
  min-width: 260px;
}
iframe {
  width: 100%;
  max-height: 100%;
}
</style>