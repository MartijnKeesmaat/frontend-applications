<script>
  import { onMount } from "svelte";
  import NavLink from "../components/NavLink.svelte";
  export let videoSrc;
  export let videoTitle;
  export let localStorageLink;
  export let photoCount;
  export let posterSrc;
  export let linksTo;

  let context, video, canvas, w, h;
  let isShowNextVideo = false;

  onMount(() => {
    initVideoSnapshot();
    playVideo();
    toggleNext();
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
    localStorage.setItem(localStorageLink, image);
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

  // #### VIDEO INSTRUCTIONS #####
  function playVideo() {
    const videoInstructions = document.getElementById("video-instructions");
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

  function toggleNext() {
    document.querySelector("video").addEventListener("ended", myHandler, false);

    function myHandler(e) {
      console.log("a");
      isShowNextVideo = true;
    }
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

    cursor: pointer;

    opacity: 0;
    transition: 0.3s all ease;
    background: #ffe6a0;
    box-shadow: 0 0 30px 4px rgba(255, 230, 160, 0.4);
  }

  #snap:hover {
    box-shadow: 0 0 30px 6px rgba(255, 230, 160, 0.4);
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

  .video-and-snapshot-wrapper {
    display: flex;
    align-items: flex-end;
  }

  .video-container {
    position: relative;

    width: 100%;
    height: 100%;
  }

  .video-overlay {
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

    background: rgba(10, 10, 10, 0.7);

    cursor: pointer;
  }

  .video-overlay:hover {
    background: rgba(0, 0, 0, 0.35);
  }

  .video-overlay:hover .button-round {
    border: 2px solid rgba(255, 255, 255, 0.6);
  }

  .video-overlay:hover h3 {
    opacity: 1;
  }

  .video-overlay button {
    border: none;
    background: none;
  }

  .video-overlay h3 {
    max-width: 240px;
    margin: 0;
    margin-right: 10px;

    transition: 0.3s all ease;

    text-align: right;
    letter-spacing: 1px;
    color: #fff;

    font-size: 17px;
    font-weight: 400;

    opacity: 0.7;
  }

  .video-overlay button img {
    width: 9px;
    height: 14px;
  }

  .next-video .flex {
    display: flex;
    align-items: center;
  }
</style>

<article class="video-view">
  <div class="video-and-snapshot-wrapper">
    <div class="video-wrapper">

      <section class="video-meta-description">
        <div class="video-count">
          <h3 class="video-count__title">Foto</h3>
          <p class="video-count__count">{photoCount}</p>
        </div>

        <h1 class="video-title">{videoTitle}</h1>
      </section>

      <div class="video-container">
        <div class="video-overlay" on:click={playVideo} id="video-instructions">
          <h3>
            Maak momentopnames van de gebeurtenis, de laatste zie je straks
            terug
          </h3>

          <button>
            <span class="button-round">
              <img src="/icons/arrow-solid.svg" alt="" />
            </span>
          </button>
        </div>

        {#if isShowNextVideo}
          <NavLink to={linksTo}>
            <div class="video-overlay next-video">
              <div class="flex">
                <h3>Bekijk het volgende video fragment</h3>
                <button>
                  <span class="button-round">
                    <img src="/icons/arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </NavLink>
        {/if}

        <video poster={posterSrc}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {#if !isShowNextVideo}
        <button id="snap" on:click={takeSnapShot}>
          <img src="/icons/camera.svg" alt="" />
        </button>
      {/if}
    </div>

    <div id="snapshots-taken">
      <h4>Jouw foto's</h4>
    </div>

    <canvas id="snapshot-canvas" width="640" height="480" />
  </div>
</article>
