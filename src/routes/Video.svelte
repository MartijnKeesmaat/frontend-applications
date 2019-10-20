<script>
  import { onMount } from "svelte";
  let context, video, canvas, w, h, ratio;

  onMount(() => {
    video = document.querySelector("video");
    canvas = document.getElementById("snapshot-canvas");
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

  onMount(() => {
    drawMask();
  });

  function drawMask() {
    const canvas = document.getElementById("mask");
    const ctx = canvas.getContext("2d");

    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    let offsetX, offsetY;

    function draw(cx, cy, radius) {
      ctx.save();
      ctx.clearRect(0, 0, w, h);

      const radialGradient = ctx.createRadialGradient(
        cx,
        cy,
        1,
        cx,
        cy,
        radius
      );

      radialGradient.addColorStop(0, "rgba(0, 0, 0, 0.3)");
      radialGradient.addColorStop(0.65, "rgba(0, 0, 0, 0.3)");
      radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();

      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "destination-out";

      ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = radialGradient;
      ctx.fill();

      ctx.restore();
    }

    function mouseMove(e) {
      e.preventDefault();
      e.stopPropagation();

      const mouseX = parseInt(e.clientX - offsetX);
      const mouseY = parseInt(e.clientY - offsetY);

      draw(mouseX, mouseY, 400);
    }

    function reOffset() {
      const BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }

    reOffset();

    window.onscroll = function(e) {
      reOffset();
    };

    window.onresize = function(e) {
      reOffset();
    };

    document.body.addEventListener("mousemove", mouseMove, false);
    document.body.addEventListener("touchmove", mouseMove, false);

    draw(w / 2, h / 2, 400);
  }
</script>

<style>
  #snapshot-canvas {
    position: fixed;
  }

  video {
    width: 800px;
    height: 400px;
  }

  .video-view {
    position: fixed;
    z-index: 10;
  }
</style>

<div class="mask-wrapper">
  <canvas id="mask" width="500" height="300" />
  <img id="bg-img" src="./img/dummy1.jpg" alt="" />
</div>

<section class="video-view">

  <h1 class="video-title">Onafhankelijkheid</h1>

  <video controls>
    <source src="./snow-monks.mp4" type="video/mp4" />
  </video>
  <button id="snap" on:click={snap}>Snap Photo</button>
  <canvas id="snapshot-canvas" width="640" height="480" />
</section>
