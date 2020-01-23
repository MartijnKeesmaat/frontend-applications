<script>
  import { onMount } from "svelte";
  import SpotlightBackground from "../components/SpotlightBackground.svelte";
  import NavLink from "../components/NavLink.svelte";
  import VideoSnapshot from "../components/VideoSnapshot.svelte";

  const gradientColor = [
    "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0)"
  ];
</script>

<style>

</style>

<SpotlightBackground
  {gradientColor}
  spotSize="500"
  backgroundColor="rgba(15, 20, 20, 0.9)"
  backgroundImage="https://scontent-ams4-1.xx.fbcdn.net/v/t1.0-9/66210260_1102391746625392_5411783231047467008_o.jpg?_nc_cat=100&_nc_oc=AQn8zZscQiYLhIAUv6wse-edQaEQjZHdxw-a9XNZv_QWt5erWO1SNBqq35RhIhHNEbw&_nc_ht=scontent-ams4-1.xx&oh=93c946434c48a8a50550491c75bf8a95&oe=5ED5A849" />

<VideoSnapshot
  videoSrc="/video/landing-marine.mp4"
  posterSrc="/img/poster.jpg"
  videoTitle="Marine landing"
  localStorageLink="snapshot1"
  photoCount="01"
  linkTo="/video2"
  linkToText="Bekijk het volgende video fragment" />
