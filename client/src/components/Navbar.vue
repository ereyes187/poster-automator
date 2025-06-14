<script setup lang="ts">
import { ref } from "vue";
import ViniLogo from "./icons/Vini.vue";
import MenuIcon from "./icons/Menu.vue";

const isMenuOpen = ref<boolean>(false);

const toggleMenu = (e: MouseEvent) => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="fixed top-0 z-[1000] w-full border-b bg-white">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 right-0 flex items-center md:hidden">
          <button
            @click="toggleMenu"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <MenuIcon :isMenuOpen="isMenuOpen" />
          </button>
        </div>
        <div class="flex flex-1 md:items-stretch md:justify-start">
          <div class="flex shrink-0 items-center">
            <ViniLogo />
          </div>
          <div class="hidden content-center sm:ml-6 md:block">
            <div class="flex space-x-4">
              <a href="#" class="navLinks" aria-current="page"> Home </a>
              <a href="#" class="navLinks"> About </a>
              <a href="#" class="navLinks"> Contact </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute w-full border-b bg-white px-2 py-4 md:hidden"
      id="mobile-menu"
      :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
    >
      <a href="#" class="navButtons" aria-current="page"> Home </a>
      <a href="#" class="navButtons"> About </a>
      <a href="#" class="navButtons"> Contact </a>
    </div>
  </nav>
</template>
