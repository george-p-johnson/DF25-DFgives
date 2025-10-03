<template>
  <div class="video-page">
    <video
      ref="videoPlayer"
      src="/videos/promo.mp4"  
      autoplay
      playsinline
      @ended="goNext"
    ></video>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goNext() {
  router.push('/') 
}
</script>

<style scoped>
.video-page {
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: black; */
}
video {
  max-width: 100%;
  max-height: 100%;
}
</style>

