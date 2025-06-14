<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import SpotifyIcon from "@/components/icons/Spotify.vue";
</script>

<template>
  <body
    class="flex h-screen flex-col font-inter leading-normal text-neutral-500"
  >
    <header>
      <Navbar />
    </header>
    <main class="flex-1 px-4 pt-24 text-center">
      <RouterView />
    </main>
    <footer class="flex w-full justify-center gap-2 border-t pb-2 pt-2">
      Powered by the Spotify Web API
      <SpotifyIcon />
    </footer>
  </body>
</template>
