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
  <body
    class="flex h-screen flex-col font-inter leading-normal text-neutral-500"
  >
    <header>
      <Navbar />
    </header>
    <main class="flex-1 pt-24 text-center">
      <!-- Main form -->
      <section v-if="!selectedAlbum">
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
          class="flex flex-col justify-center gap-4 px-4 py-8 md:flex-row"
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
              class="block w-full rounded-full border-2 border-neutral-800 px-28 py-3 ps-10"
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
          Search results for: {{ previousQuery }}
        </p>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 22 22"
            fill="none"
            stroke="#737373"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        <AlbumPoster :album="selectedAlbum" @album-unselected="deselectAlbum" />
      </div>
    </main>
    <footer class="flex w-full justify-center gap-2 pb-2">
      Powered by the Spotify Web API
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#1DB954	"
      >
        <path
          d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm4.87 17.66c-.2 0-.33-.06-.51-.18a12.03 12.03 0 0 0-6.2-1.6c-1.3 0-2.59.16-3.8.42-.19.04-.44.11-.59.11a.75.75 0 0 1-.75-.75c0-.5.29-.75.65-.82 1.48-.34 2.96-.53 4.49-.53 2.62 0 4.97.6 6.98 1.8.3.18.47.36.47.8 0 .43-.35.75-.74.75zm1.3-3.17c-.25 0-.42-.1-.6-.21a15.22 15.22 0 0 0-7.62-1.93c-1.51 0-2.83.21-3.91.5-.24.07-.37.14-.59.14a.94.94 0 0 1-.93-.95c0-.5.24-.86.74-1C6.61 10.67 8 10.4 10 10.4c3.15 0 6.18.78 8.57 2.2.4.24.55.53.55.96 0 .52-.41.94-.93.94zm1.5-3.7c-.25 0-.4-.06-.62-.18-2.18-1.3-5.55-2.02-8.8-2.02-1.63 0-3.29.16-4.8.57-.17.05-.4.14-.62.14-.64 0-1.13-.51-1.13-1.15 0-.65.4-1.02.84-1.15 1.71-.5 3.62-.74 5.7-.74 3.52 0 7.23.73 9.94 2.32.36.2.62.52.62 1.09 0 .65-.53 1.12-1.14 1.12z"
        />
      </svg>
    </footer>
  </body>
</template>
