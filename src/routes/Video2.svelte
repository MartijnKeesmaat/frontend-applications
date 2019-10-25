<!-- <script>
  import { onMount } from "svelte";
  import spotlightBackground from "../functions/spotlightBackground.js";
  import VideoSnapshot from "../components/VideoSnapshot.svelte";

  onMount(() => {
    spotlightBackground({
      spotSize: 500,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      gradientColor: [
        "rgba(0, 0, 0, 0.1)",
        "rgba(0, 0, 0, 0.1)",
        "rgba(0, 0, 0, 0)"
      ]
    });
  });
</script><style>

</style><div class="mask-wrapper">
  <canvas id="mask" width="500" height="300" />
  <img id="bg-img" src="/img/dummy2.jpg" alt="" />
</div>

<VideoSnapshot
  videoSrc="/video/landing-marine.mp4"
  videoTitle="Wegversperingen"
  posterSrc="/img/poster.jpg"
  localStorageLink="snapshot2"
  photoCount="02" /> -->
