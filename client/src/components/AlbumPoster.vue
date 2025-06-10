<script setup lang="ts">
import { defineProps, ref, watchEffect } from "vue";
import type { AlbumObject } from "@/interfaces";

const props = defineProps<{
  album: AlbumObject;
}>();

let albumLength = ref<string>();
// let tracksStringLength = ref<number>(0);

watchEffect(() => {
  let totalMinutes = 0;
  for (let i = 0; i < props.album.tracks.items.length; i++) {
    totalMinutes = totalMinutes + props.album.tracks.items[i].duration_ms;
  }
  totalMinutes = totalMinutes / 60000;
  let minutes = Math.floor(totalMinutes);
  let seconds = Math.floor((totalMinutes - minutes) * 60);
  let length = `${minutes}:${seconds}`;
  albumLength.value = length;
});

// watchEffect(() => {
//   let length = 0;
//   for (let i = 0; i < props.album.tracks.items.length; i++) {
//     length = length + props.album.tracks.items[i].name.length;
//   }
//   tracksStringLength.value = length;
//   console.log(tracksStringLength.value);
// });
</script>

<template>
  <div class="justify-self-center bg-black text-white shadow-xl">
    <div class="relative">
      <img class="max-w-lg" :src="props.album.images[0].url" />
      <div
        class="absolute bottom-0 flex h-60 w-full items-end justify-between bg-gradient-to-t from-[black] to-transparent pb-4"
      >
        <hgroup class="pl-6 text-left text-lg">
          <h1 class="font-bold">
            {{ props.album.name }}
          </h1>
          <p>
            {{ props.album.artists[0].name }}
          </p>
        </hgroup>
        <div class="flex gap-2 pr-6">
          <div class="h-10 w-10 border-2 border-white bg-neutral-950" />
          <div class="h-10 w-10 border-2 border-white bg-neutral-700" />
          <div class="h-10 w-10 border-2 border-white bg-neutral-500" />
        </div>
      </div>
    </div>
    <hr class="mx-auto h-1 w-[94%] rounded-sm border-0 bg-white" />
    <div class="space-between flex max-h-56 min-h-56 px-6 py-4">
      <ol class="flex flex-grow flex-col flex-wrap">
        <li
          v-for="(song, index) in props.album.tracks.items"
          class="line-clamp-2 max-w-32 text-left text-[10px]"
        >
          {{ index + 1 + ". " + song.name }}
        </li>
      </ol>
      <div class="flex flex-col gap-4 text-[10px]">
        <hgroup class="text-right">
          <h1 class="pb-1 font-bold">Release Date</h1>
          <p>{{ props.album.release_date }}</p>
        </hgroup>
        <hgroup class="text-right">
          <h1 class="pb-1 font-bold">Album Length</h1>
          <p>{{ albumLength }}</p>
        </hgroup>
      </div>
    </div>
  </div>
</template>
