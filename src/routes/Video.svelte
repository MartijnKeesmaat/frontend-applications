<script>
  import { onMount } from "svelte";
  let context, video, canvas, w, h;

  onMount(() => {
    spotlightBackground();
    initVideoSnapshot();
    showVideo();
  });

  // #### VIDEO SNAPSHOT #####
  // 1. init video & Canvas
  // 2. draw frame from video on the canvas
  // 3. Convert the frame to an img(Base64) and store it
  // 4. Style the img
  // 5. Add it to the DOM
  // 6. Clear the canvas

  function initVideoSnapshot() {
    video = document.querySelector("video");
    canvas = document.getElementById("snapshot-canvas");
    context = canvas.getContext("2d");
    video.addEventListener("loadedmetadata", setCanvasDimensions, false);
  }

  function setCanvasDimensions() {
    const ratio = video.videoWidth / video.videoHeight;
    w = video.videoWidth - 100;
    h = parseInt(w / ratio, 10);
    canvas.width = w;
    canvas.height = h;
  }

  function takeSnapShot() {
    drawVideoFrame();
    const snapshot = getVideoFrameFromCanvas();
    styleSnapshot(snapshot);
    addSnapshotToDOM(snapshot);
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawVideoFrame() {
    context.fillRect(0, 0, w, h);
    context.drawImage(video, 0, 0, w, h);
  }

  function getVideoFrameFromCanvas() {
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const snapshot = new Image();
    snapshot.src = image;
    return snapshot;
  }

  function styleSnapshot(snapshot) {
    snapshot.style.border = "2px solid #c7c6c3";
    snapshot.width = 136;
    snapshot.height = 91;
    snapshot.style.position = "absolute";
    let random = Math.floor(Math.random() * 30) + 1;
    random *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

    snapshot.style.transform = `rotate(${random}deg)`;
  }

  function addSnapshotToDOM(snapshot) {
    document.querySelector("#snapshots-taken h4").style.opacity = 1;
    document.querySelector("#snapshots-taken").appendChild(snapshot);
  }

  // #### SPOTLIGHT BACKGROUND #####
  function spotlightBackground() {
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

      radialGradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
      radialGradient.addColorStop(0.65, "rgba(0, 0, 0, 0.1)");
      radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();

      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
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

      draw(mouseX, mouseY, 500);
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

    draw(w / 2, h / 2, 500);
  }

  function showVideo() {
    const videoInstructions = document.querySelector(".video-instructions");
    const snapButton = document.getElementById("snap");
    const videoPlayer = document.querySelector("video");

    function toggleVideoClass() {
      videoInstructions.style.opacity = 0;
      videoInstructions.style.visibility = "hidden";
      videoPlayer.play();

      setTimeout(function() {
        snapButton.style.opacity = 1;
      }, 1200);
    }

    videoInstructions.addEventListener("click", toggleVideoClass);
  }
</script>

<style>
  #snapshot-canvas {
    position: fixed;
  }

  video {
    width: 888px;
    height: 496px;

    background: #000;
  }

  .video-view {
    position: fixed;
    z-index: 10;
  }

  .video-view {
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 900px;
    height: 100vh;
    margin: 0 auto;

    color: #fff;
  }

  .video-wrapper {
    position: relative;

    margin-left: 100px;
  }

  .video-meta-description {
    display: flex;
    justify-content: space-between;
  }

  .video-title {
    margin: 20px 0;

    letter-spacing: 4.3px;
    text-transform: uppercase;

    color: #ffe6a0;

    font-size: 30px;
    font-weight: 400;
  }

  .video-count__title {
    margin: 0;
    margin-top: 5px;

    letter-spacing: 1.91px;
    text-transform: uppercase;

    font-size: 15px;
    font-weight: 400;
  }

  .video-count__count {
    margin: 0;
    margin-top: -5px;

    letter-spacing: 5.3px;

    font-family: "Playfair Display", serif;
    font-size: 42px;
    line-height: 1;
  }

  video:focus {
    outline: none;
  }

  #snap {
    position: absolute;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 55px;
    height: 55px;

    opacity: 0;
    transition: 0.3s all ease;
    background: #ffe6a0;
    box-shadow: 0 0 30px 4px rgba(255, 230, 160, 0.4);
  }

  #snap img {
    width: 20px;
    height: 28px;
  }

  #snapshots-taken {
    margin-bottom: 100px;
    margin-left: 50px;
  }

  #snapshots-taken h4 {
    width: 80px;
    margin-bottom: 41px;

    letter-spacing: 2px;
    text-transform: uppercase;

    opacity: 0;

    font-size: 14px;
    line-height: 1.4;
  }

  .outer-wrapper {
    display: flex;
    align-items: flex-end;
  }

  .video-instructions__container {
    position: relative;

    width: 100%;
    height: 100%;
  }

  .video-instructions {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    padding-bottom: 30px;

    transition: 0.3s all ease;

    background: rgba(0, 0, 0, 0.6);

    cursor: pointer;
  }

  .video-instructions button {
    border: none;
    background: none;
  }

  .video-instructions .divie {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-instructions h3 {
    max-width: 260px;
    margin: 0;
    margin-right: 10px;

    text-align: right;
    letter-spacing: 1px;

    font-size: 17px;
    font-weight: 400;
  }

  .video-instructions button img {
    width: 9px;
    height: 14px;
  }

  .p {
  }
</style>

<div class="mask-wrapper">
  <canvas id="mask" width="500" height="300" />
  <img id="bg-img" src="/img/dummy2.jpg" alt="" />
</div>

<section class="video-view">
  <div class="outer-wrapper">
    <div class="video-wrapper">

      <div class="video-meta-description">
        <div class="video-count">
          <h3 class="video-count__title">Foto</h3>
          <p class="video-count__count">03</p>
        </div>

        <h1 class="video-title">Onafhankelijkheid</h1>
      </div>

      <div class="video-instructions__container">
        <div class="video-instructions">
          <div class="divie">
            <h3>Maak snapshots van de video, alleen de laatste telt</h3>
            <button>
              <span class="button-round">
                <img src="/icons/arrow-solid.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
        <video poster="/img/poster.jpg">
          <source src="/video/demo2.mp4" type="video/mp4" />
        </video>
      </div>

      <button id="snap" on:click={takeSnapShot}>
        <img src="/icons/camera.svg" alt="" />
      </button>
    </div>

    <div id="snapshots-taken">
      <h4>Jouw foto's</h4>
    </div>

    <canvas id="snapshot-canvas" width="640" height="480" />
  </div>
</section>
