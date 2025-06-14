<script setup lang="ts">
import { defineProps, ref, watchEffect } from "vue";
import type { AlbumObject } from "@/interfaces";
import ColorThief from "colorthief";

const props = defineProps<{
  album: AlbumObject;
}>();

// Design Ideas
// Get Track's Audio Analyis and display tracks as soundwaves. Requires research

let albumLength = ref<string>();
let image = ref<HTMLImageElement>();
let primaryColor = ref<string>();
let secondaryColor = ref<string>();
let tertiaryColor = ref<string>();
let readableTextColor = ref<string>();
let textSize = ref<number>(10);

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

function onImgLoad() {
  const colorthief = new ColorThief();
  const colors = colorthief.getPalette(image.value, 3);
  readableTextColor.value = getReadableTextColor(
    colors[0][0],
    colors[0][1],
    colors[0][2],
  );
  primaryColor.value = colors[0].join(", ");
  secondaryColor.value = colors[1].join(", ");
  tertiaryColor.value = colors[2].join(", ");
}

function getReadableTextColor(r: number, g: number, b: number) {
  const yiq = r * 0.299 + g * 0.587 + b * 0.114;
  return yiq > 186 ? "black" : "white";
}
</script>

<template>
  <div
    class="justify-self-center shadow-xl"
    :style="{
      backgroundColor: `rgb(${primaryColor})`,
      color: readableTextColor,
    }"
  >
    <div class="relative">
      <img
        ref="image"
        class="max-w-lg"
        @load="onImgLoad"
        :src="props.album.images[0].url"
        crossorigin="anonymous"
      />
      <div
        class="absolute bottom-0 flex h-60 w-full items-end justify-between pb-4"
        :style="{
          background: `linear-gradient(to top, rgb(${primaryColor}), rgba(0,0,0,0))`,
        }"
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
          <div
            class="h-10 w-10 border-2"
            :style="{
              backgroundColor: `rgb(${primaryColor})`,
              borderColor: readableTextColor,
            }"
          />
          <div
            class="h-10 w-10 border-2"
            :style="{
              backgroundColor: `rgb(${secondaryColor})`,
              borderColor: readableTextColor,
            }"
          />
          <div
            class="h-10 w-10 border-2"
            :style="{
              backgroundColor: `rgb(${tertiaryColor})`,
              borderColor: readableTextColor,
            }"
          />
        </div>
      </div>
    </div>
    <hr
      class="mx-auto h-1 w-[94%] rounded-sm border-0"
      :style="{ backgroundColor: readableTextColor }"
    />
    <div
      class="space-between flex max-h-56 min-h-56 px-6 py-4"
      :style="{ fontSize: textSize + 'px' }"
    >
      <ol class="flex flex-grow flex-col flex-wrap">
        <li
          v-for="(song, index) in props.album.tracks.items"
          class="line-clamp-2 max-w-32 text-left"
        >
          {{ index + 1 + ". " + song.name }}
        </li>
      </ol>
      <div class="flex flex-col gap-4">
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
  <label for="minmax-range" class="mt-2 block text-sm font-medium"
    >Text Size</label
  >
  <input
    id="minmax-range"
    type="range"
    min="6"
    max="14"
    v-model="textSize"
    class="h-2 w-full max-w-lg cursor-pointer rounded-lg bg-gray-200 accent-neutral-800"
  />
</template>
