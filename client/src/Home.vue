<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import type { AlbumObject } from "@/interfaces";
import AlbumPreview from "./components/AlbumPreview.vue";
import AlbumPoster from "./components/AlbumPoster.vue";
import SearchIcon from "./components/icons/Search.vue";
import ChevronLeft from "./components/icons/ChevronLeft.vue";
import Carousel from "./components/Carousel.vue";

const albumQuery = ref<string>("");
const previousQuery = ref<string>("");
const results = ref<AlbumObject[]>([]);
const error = ref<boolean>(false);
const selectedAlbum = ref<AlbumObject>();

const isVisible = ref(false);

const fetchSpotifyData = async () => {
  if (
    albumQuery.value.trim() !== "" &&
    albumQuery.value !== previousQuery.value
  ) {
    try {
      const response = await axios.get<AlbumObject[]>(
        "http://localhost:3001/search-albums",
        {
          params: { input: albumQuery.value },
        },
      );
      results.value = response.data;
      error.value = false;
    } catch (err) {
      error.value = true;
      console.error("Error searching for albums: ", err);
    }
    previousQuery.value = albumQuery.value;
    albumQuery.value = "";
  }
};

const setSelectedAlbum = (album: AlbumObject) => {
  selectedAlbum.value = album;
};

const deselectAlbum = () => {
  selectedAlbum.value = undefined;
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <section v-if="!selectedAlbum">
    <hgroup>
      <h1 class="bg-clip-text pb-2 text-6xl font-extrabold text-neutral-800">
        Poster Automator
      </h1>
      <p class="text-xl">Turn your favorite music covers into beautiful art</p>
    </hgroup>
    <form
      class="flex flex-col justify-center gap-4 px-4 py-8 md:flex-row"
      @submit.prevent="fetchSpotifyData"
    >
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
        >
          <SearchIcon />
        </div>
        <input
          class="block w-full rounded-full border-2 border-neutral-800 px-28 py-3 ps-10"
          type="text"
          v-model="albumQuery"
          placeholder="e.g. Arctic Monkeys"
        />
      </div>
      <button
        class="rounded-full bg-neutral-800 px-8 py-3 text-sm text-white transition duration-200 hover:scale-105 hover:bg-neutral-700 hover:shadow-xl"
      >
        Search
      </button>
    </form>
    <p
      class="line-clamp-2 w-72 justify-self-center"
      v-if="previousQuery && !error"
    >
      Search results for: {{ previousQuery }}
    </p>
    <p class="line-clamp-2 w-72 justify-self-center" v-if="error">
      Uh oh, something went wrong...
    </p>
  </section>

  <section v-if="!previousQuery" class="mx-auto max-w-7xl">
    <Carousel />
  </section>

  <!-- Search Results -->
  <section
    v-if="results.length > 0 && !selectedAlbum"
    class="mx-auto max-w-7xl px-8 py-10 text-center"
  >
    <ul class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="album in results" :key="album.id">
        <AlbumPreview
          :album="album"
          @album-details-fetched="setSelectedAlbum"
        />
      </li>
    </ul>
  </section>

  <!-- Album Poster -->
  <div v-if="selectedAlbum">
    <button
      class="flex justify-self-center pb-2 leading-5"
      @click="deselectAlbum"
    >
      <ChevronLeft />
      Back
    </button>
    <AlbumPoster :album="selectedAlbum" @album-unselected="deselectAlbum" />
  </div>
</template>
