<template>
  <div class="twc_videofile">
    <video controls="1">
      <source :src="videoUrl" type="video/mp4" />
    </video>
  </div>
</template>

<script>
export default {
  name: 'FilevideoMessage',
  props: {
    message: {
      type: Object,
      required: true,
      validator: (message) => {
        return (
          message &&
          message.type === 'filevideo' &&
          message.data &&
          message.data.video_url
        );
      },
    },
  },
  computed: {
    videoUrl() {
      return this.message.data.video_url + '#t=0.1';
    },
  },
};
</script>

<style>
.twc_videofile {
  width: 100%;
  margin-right: 40px;
  min-width: 260px;
}
video {
  width: 100%;
  max-height: 100%;
}
</style>