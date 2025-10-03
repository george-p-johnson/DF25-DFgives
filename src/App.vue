<template>
  <div id="app-container">
    <!-- Only show background video and images on non-admin routes -->
    <template v-if="!isAdminRoute">
      <!-- Background video always present -->
      <video autoplay muted loop playsinline class="bg-video">
        <source src="/videos/leaderboard.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <!-- Overlay image that fades -->
      <transition name="fade" mode="out-in">
        <img
          v-if="currentImage"
          :key="currentImage"
          :src="currentImage"
          alt="Overlay"
          class="image-overlay"
        />
      </transition>
    </template>

    <!-- Router view displays the component based on the route -->
    <router-view />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const images = [
  '/img/1.png',
  '/img/2.png',
  '/img/3.png',
  '/img/4.png',
  '/img/5.png',
  '/img/6.png',
  '/img/7.png'
]

const currentIndex = ref(0)
const currentImage = computed(() => images[currentIndex.value])

// Check if current route is admin
const isAdminRoute = computed(() => route.path === '/admin')

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 10000) // switch every 10s
})
</script>

<style>
#app-container {
  position: relative;
  width: 896px;
  height: 512px;
  overflow: hidden;
}

/* background video */
.bg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

/* overlay image */
.image-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  pointer-events: none;
}

/* fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>