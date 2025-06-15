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
            <RouterLink to="/">
              <ViniLogo />
            </RouterLink>
          </div>
          <div class="hidden content-center sm:ml-6 md:block">
            <div class="flex space-x-4">
              <RouterLink
                active-class="font-bold text-neutral-800"
                class="navLinks"
                to="/"
                >Home</RouterLink
              >
              <RouterLink
                active-class="font-bold text-neutral-800"
                class="navLinks"
                to="/contact"
                >Contact</RouterLink
              >
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
      <RouterLink
        @click="toggleMenu"
        active-class="font-bold text-neutral-800"
        class="navButtons"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        @click="toggleMenu"
        active-class="font-bold text-neutral-800"
        class="navButtons"
        to="/contact"
        >Contact</RouterLink
      >
    </div>
  </nav>
</template>
