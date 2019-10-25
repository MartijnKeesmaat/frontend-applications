<script>
  import { onMount } from "svelte";
  export let spotSize;
  export let gradientColor;
  export let backgroundColor;
  export let backgroundImage;
  onMount(() => {
    execute();
  });

  function execute() {
    // #### SPOTLIGHT BACKGROUND #####
    // 1. init cavas
    // 2. create radial gradient
    // 3. draw background
    // 4. add radial gradient to background

    let canvas, ctx, w, h, offsetX, offsetY, radialGradient;

    // init
    setup();
    reOffset();
    drawSpotlight(w / 2, h / 2, spotSize);

    // master function
    function drawSpotlight(cx, cy, radius) {
      ctx.save();
      ctx.clearRect(0, 0, w, h);
      createRadialGradient(cx, cy, radius);
      drawBackground();
      addRadialGradient(cx, cy, radius);
      ctx.restore();
    }

    // event function
    function drawOnMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();

      const mouseX = parseInt(e.clientX - offsetX);
      const mouseY = parseInt(e.clientY - offsetY);

      drawSpotlight(mouseX, mouseY, spotSize);
    }

    // functions
    function setup() {
      canvas = document.getElementById("mask");
      ctx = canvas.getContext("2d");

      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createRadialGradient(cx, cy, radius) {
      radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);
      radialGradient.addColorStop(0, gradientColor[0]);
      radialGradient.addColorStop(0.65, gradientColor[1]);
      radialGradient.addColorStop(1, gradientColor[2]);
    }

    function drawBackground() {
      ctx.beginPath();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "destination-out";
    }

    function addRadialGradient(cx, cy, radius) {
      ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = radialGradient;
      ctx.fill();
    }

    function reOffset() {
      const BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }

    // events
    window.onscroll = function(e) {
      reOffset();
    };
    window.onresize = function(e) {
      reOffset();
    };

    document.body.addEventListener("mousemove", drawOnMouseMove, false);
    document.body.addEventListener("touchmove", drawOnMouseMove, false);
  }
</script>

<style>

</style>

<div class="mask-wrapper">
  <canvas id="mask" width="500" height="300" />
  <img
    id="bg-img"
    src={backgroundImage}
    alt="https://www.facebook.com/Kleuruwverleden/" />
</div>
