<script setup lang="ts">
import { defineProps } from "vue";
import axios from "axios";
import type { AlbumObject } from "@/interfaces";

const emit = defineEmits<{
  (e: "album-details-fetched", album: AlbumObject): void;
}>();

const fetchAlbumDetails = async () => {
  try {
    const response = await axios.get<AlbumObject>(
      `http://localhost:3001/fetch-album/${props.album.id}`,
    );
    const album = response.data as AlbumObject;
    emit("album-details-fetched", album);
  } catch (err) {
    console.error("Error fetching album: ", err);
  }
};

const props = defineProps<{
  album: AlbumObject;
}>();
</script>

<template>
  <div
    @click="fetchAlbumDetails"
    class="group relative cursor-pointer border bg-white p-3 shadow-md duration-300 hover:border-neutral-800"
  >
    <div
      class="absolute inset-0 flex items-center justify-center bg-neutral-400 bg-opacity-25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <span
        class="text-xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
      >
        Create
      </span>
    </div>
    <img class="w-fit" :src="props.album.images[0].url" />
    <hgroup class="h-24 content-center px-2 pt-2 text-center">
      <h1 class="line-clamp-2 text-lg font-bold text-neutral-800">
        {{ props.album.name }}
      </h1>
      <p class="text-sm">
        {{ props.album.artists[0].name }}
      </p>
    </hgroup>
  </div>
</template>
