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
  <img
    id="bg-img"
    src="https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/27654433_764037853794118_4739243479831552770_n.jpg?_nc_cat=108&_nc_oc=AQlDa3nzcVUyWNXYYwZEXB8Kev00AxKqAS7BFDEmsjf5XUh_ovHWoSt79F4l7EvEyRw&_nc_ht=scontent-amt2-1.xx&oh=e76eebc07cb1521fc411076a32b46eb0&oe=5E1871CE"
    alt="https://www.facebook.com/Kleuruwverleden/" />
</div>

<VideoSnapshot
  videoSrc="/video/landing-marine.mp4"
  posterSrc="/img/poster.jpg"
  videoTitle="Marine landing"
  localStorageLink="snapshot1"
  photoCount="03" /> -->
