<script>
  import { onMount } from "svelte";
  export let localStorageLink;
  let context, video, canvas, w, h;

  onMount(() => {
    initVideoSnapshot();
    addPrevSnapshots("snapshot1");
    addPrevSnapshots("snapshot2");
  });

  // #### VIDEO SNAPSHOT #####
  // 1. init video & Canvas
  // 2. draw frame from video on the canvas
  // 3. Convert the frame to an img(Base64) and store it
  // 4. Style the img
  // 5. Add it to the DOM
  // 6. Clear the canvas

  // init
  function initVideoSnapshot() {
    video = document.querySelector("video");
    canvas = document.getElementById("snapshot-canvas");
    context = canvas.getContext("2d");
    video.addEventListener("loadedmetadata", setCanvasDimensions, false);
  }

  function setCanvasDimensions() {
    const ratio = video.videoWidth / video.videoHeight;
    w = video.videoWidth - 100;
    h = Math.floor(w / ratio, 10);
    canvas.width = w;
    canvas.height = h;
  }

  // Main function
  function takeSnapShot() {
    drawVideoFrame();
    const snapshot = getVideoFrameFromCanvas();
    styleSnapshot(snapshot);
    addSnapshotToDOM(snapshot);
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Functionality
  function drawVideoFrame() {
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

  // add snapshots from local storage
  function addPrevSnapshots(snapshot) {
    if (localStorage.getItem(snapshot)) {
      const prevSnapshot = localStorage.getItem(snapshot);
      const snapshotImg = new Image();
      snapshotImg.src = prevSnapshot;
      styleSnapshot(snapshotImg);
      addSnapshotToDOM(snapshotImg);
    }
  }
</script>

<style>
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
</style>

<button id="snap" on:click={takeSnapShot}>
  <img src="/icons/camera.svg" alt="" />
</button>
