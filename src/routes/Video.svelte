<script>
  import { onMount } from "svelte";
  import spotlightBackground from "../functions/spotlightBackground.js";
  import NavLink from "../components/NavLink.svelte";
  let context, video, canvas, w, h;

  onMount(() => {
    spotlightBackground({
      spotSize: 500,
      backgroundColor: "rgba(15, 20, 20, 0.8)",
      gradientColor: [
        "rgba(0, 0, 0, 0.1)",
        "rgba(0, 0, 0, 0.1)",
        "rgba(0, 0, 0, 0)"
      ]
    });
    initVideoSnapshot();
    showVideo();
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
    localStorage.setItem("snapshot1", image);
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

  function toggleNext() {
    document.querySelector("video").addEventListener("ended", myHandler, false);

    function myHandler(e) {
      const videoInstructions = document.querySelector(".video-instructions");
      const snapButton = document.getElementById("snap");
      console.log("a");
      console.log(videoInstructions);
      snapButton.style.opacity = 0;
      videoInstructions.style.opacity = 1;
      videoInstructions.style.visibility = "visible";

      document.querySelector(".video-instructions__container").innerHTML = `
          <NavLink class="next-video" to="/video2">
            <h3>Bekijk de volgende video</h3>
          </NavLink>
        `;
      console.log("videoInstructions");
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

    background: rgba(10, 10, 10, 0.7);

    cursor: pointer;
  }

  .video-instructions:hover {
    background: rgba(0, 0, 0, 0.35);
  }

  .video-instructions:hover .button-round {
    border: 2px solid rgba(255, 255, 255, 0.6);
  }

  .video-instructions:hover h3 {
    opacity: 1;
  }

  .next-video {
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

  .video-instructions button {
    border: none;
    background: none;
  }

  .video-instructions .divie {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-instructions__container h3 {
    max-width: 240px;
    margin: 0;
    margin-right: 10px;

    transition: 0.3s all ease;

    text-align: right;
    letter-spacing: 1px;

    font-size: 17px;
    font-weight: 400;

    opacity: 0.7;
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
  <img
    id="bg-img"
    src="https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-9/27654433_764037853794118_4739243479831552770_n.jpg?_nc_cat=108&_nc_oc=AQlDa3nzcVUyWNXYYwZEXB8Kev00AxKqAS7BFDEmsjf5XUh_ovHWoSt79F4l7EvEyRw&_nc_ht=scontent-amt2-1.xx&oh=e76eebc07cb1521fc411076a32b46eb0&oe=5E1871CE"
    alt="https://www.facebook.com/Kleuruwverleden/" />
</div>

<section class="video-view">
  <div class="outer-wrapper">
    <div class="video-wrapper">

      <div class="video-meta-description">
        <div class="video-count">
          <h3 class="video-count__title">Foto</h3>
          <p class="video-count__count">01</p>
        </div>

        <h1 class="video-title">Marine landing</h1>
      </div>

      <div class="video-instructions__container">
        <div class="video-instructions">
          <div class="divie">
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
        </div>
        <video poster="/img/poster.jpg">
          <source src="/video/landing-marine.mp4" type="video/mp4" />
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
