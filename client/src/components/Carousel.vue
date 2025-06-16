<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import ArcticMonkeys from "@/assets/images/ArcticMonkeys.png";
import BadBunny from "@/assets/images/BadBunny.png";
import HarryStyles from "@/assets/images/HarryStyles.png";
import JCole from "@/assets/images/JCole.png";
import JuiceWrld from "@/assets/images/JuiceWrld.png";
import KanyeWest from "@/assets/images/KanyeWest.png";
import Kendricklamar from "@/assets/images/KendrickLamar.png";
import LanaDelRey from "@/assets/images/LanaDelRey.png";
import MacMiller from "@/assets/images/MacMiller.png";
import NatanaelCano from "@/assets/images/NatanaelCano.png";
import NothingButThieves from "@/assets/images/NothingButThieves.png";
import PesoPluma from "@/assets/images/PesoPluma.png";
import PostMalone from "@/assets/images/PostMalone.png";
import Rihanna from "@/assets/images/Rihanna.png";
import SZA from "@/assets/images/SZA.png";
import TameImpala from "@/assets/images/TameImpala.png";
import TheWeeknd from "@/assets/images/TheWeeknd.png";
import TylerTheCreator from "@/assets/images/TylerTheCreator.png";
import CigarettesAfterSex from "@/assets/images/CigarettesAfterSex.png";
import TheStrokes from "@/assets/images/TheStrokes.png";
import Drake from "@/assets/images/Drake.png";
import KidCudi from "@/assets/images/KidCudi.png";
import Beatles from "@/assets/images/Beatles.png";
import PinkFloyd from "@/assets/images/PinkFloyd.png";
import ArianaGrande from "@/assets/images/ArianaGrande.png";
import EslabonArmado from "@/assets/images/EslabonArmado.png";

const artists = [
  ArcticMonkeys,
  BadBunny,
  Kendricklamar,
  HarryStyles,
  TheWeeknd,
  JCole,
  JuiceWrld,
  KanyeWest,
  LanaDelRey,
  MacMiller,
  NatanaelCano,
  NothingButThieves,
  PesoPluma,
  PostMalone,
  Rihanna,
  SZA,
  TameImpala,
  TylerTheCreator,
  TheStrokes,
  Drake,
  CigarettesAfterSex,
  KidCudi,
  Beatles,
  PinkFloyd,
  ArianaGrande,
  EslabonArmado,
];

// Take user's profile most listened to albums and
// populate array to preview those albums

const artistsShuffled = shuffleArray(artists).slice(0, 6);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
</script>

<template>
  <Carousel
    breakpoint-mode="carousel"
    :mouse-drag="{ threshold: 1 }"
    :touch-drag="true"
    :gap="20"
    :autoplay="3000"
    :pause-autoplay-on-hover="true"
    :wrap-around="true"
    :breakpoints="{
      400: {
        itemsToShow: 1.5,
        snapAlign: 'center',
      },
      600: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      800: {
        itemsToShow: 2.5,
        snapAlign: 'center',
      },
      1100: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
    }"
  >
    <Slide v-for="album in artistsShuffled" :key="album">
      <img :src="album" />
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;
}

.carousel {
  --vc-nav-background: rgba(223, 223, 223, 0.7);
  --vc-nav-border-radius: 100%;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}
</style>
