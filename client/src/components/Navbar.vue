<script setup lang="ts">
import { ref } from "vue";

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
            class="focus:outline-hidden relative inline-flex items-center justify-center rounded-md p-2 text-neutral-800"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <svg
              :class="{ block: !isMenuOpen, hidden: isMenuOpen }"
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 md:items-stretch md:justify-start">
          <div class="flex shrink-0 items-center">
            <svg
              class="w-18 h-auto cursor-pointer"
              width="150"
              height="64"
              viewBox="0 0 150 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="50%"
                y="55%"
                text-anchor="middle"
                fill="black"
                audley
                font-size="40"
                font-weight="bold"
                letter-spacing="2.5"
                font-family="Cookie"
                dy=".2em"
              >
                <!-- Arizonia, Allura, Caramel, Smooch, Style Script, Pattaya, 
            Cookie, Lily Script One, Yellowtail -->
                Vini
              </text>
            </svg>
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
