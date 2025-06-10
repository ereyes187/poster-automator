<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import type { AlbumObject } from "@/interfaces";
import Navbar from "./components/Navbar.vue";
import AlbumPreview from "./components/AlbumPreview.vue";
import AlbumPoster from "./components/AlbumPoster.vue";

const albumQuery = ref<string>("");
const previousQuery = ref<string>("");
const results = ref<AlbumObject[]>([]);
const selectedAlbum = ref<AlbumObject>();

const fetchSpotifyData = async () => {
  if (albumQuery.value.trim() !== "") {
    try {
      const response = await axios.get<AlbumObject[]>(
        "http://localhost:3001/search-albums",
        {
          params: { input: albumQuery.value },
        },
      );
      results.value = response.data;
    } catch (err) {
      console.error("Error searching for albums: ", err);
    }
  }
  previousQuery.value = albumQuery.value;
  albumQuery.value = "";
};

const setSelectedAlbum = (album: AlbumObject) => {
  selectedAlbum.value = album;
};

const deselectAlbum = () => {
  selectedAlbum.value = undefined;
};
</script>

<template>
  <body class="h-screen font-inter leading-normal text-neutral-500">
    <header>
      <Navbar />
    </header>
    <main class="h-full pt-24 text-center">
      <div v-if="!selectedAlbum">
        <section>
          <hgroup>
            <h1
              class="bg-gradient-to-t from-black to-neutral-400 bg-clip-text pb-2 text-6xl font-extrabold text-transparent"
            >
              Poster Automator
            </h1>
            <p class="text-xl">
              Turn your favorite music covers into beautiful art
            </p>
          </hgroup>
          <form
            class="mx-4 my-8 flex flex-col justify-center gap-4 md:flex-row"
            @submit.prevent="fetchSpotifyData"
          >
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
              >
                <svg
                  class="h-4 w-4 text-neutral-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                class="block w-full rounded-full border-2 border-neutral-800 px-8 py-3 ps-10"
                type="text"
                v-model="albumQuery"
                placeholder="e.g. Arctic Monkeys"
              />
            </div>
            <button
              className="px-8 rounded-full bg-neutral-800 py-3 text-white text-sm transition duration-200 hover:shadow-lg hover:text-neutral-400"
            >
              Search
            </button>
          </form>
          <p class="line-clamp-2 w-72 justify-self-center" v-if="previousQuery">
            Results for: {{ previousQuery }}
          </p>
        </section>
        <section
          v-if="!selectedAlbum"
          class="mx-auto flex max-w-7xl justify-center px-8 py-10 text-center"
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
      </div>
      <div v-if="selectedAlbum">
        <button @click="deselectAlbum">X</button>
        <AlbumPoster :album="selectedAlbum" @album-unselected="deselectAlbum" />
      </div>
    </main>
  </body>
</template>
