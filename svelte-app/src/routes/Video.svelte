<script>
  import { onMount } from "svelte";
  let context, video, canvas, w, h, ratio;

  onMount(() => {
    video = document.querySelector("video");
    canvas = document.querySelector("#canvas");
    console.log(video, canvas);
    context = canvas.getContext("2d");

    video.addEventListener(
      "loadedmetadata",
      function() {
        ratio = video.videoWidth / video.videoHeight;
        w = video.videoWidth - 100;
        h = parseInt(w / ratio, 10);
        canvas.width = w;
        canvas.height = h;
      },
      false
    );
  });
  function snap() {
    context.fillRect(0, 0, w, h);
    context.drawImage(video, 0, 0, w, h);

    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    const base64 = new Image();
    base64.src = image;
    document.querySelector(".video-view").appendChild(base64);

    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(base64);
  }
</script>

<style>
  canvas {
    position: fixed;
  }
</style>

<section class="video-view">
  <h1>Snapshot proto</h1>

  <video controls>
    <source src="./snow-monks.mp4" type="video/mp4" />
  </video>
  <button id="snap" on:click={snap}>Snap Photo</button>
  <canvas id="canvas" width="640" height="480" />
</section>
