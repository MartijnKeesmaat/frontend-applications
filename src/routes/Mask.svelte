<script>
  import { onMount } from "svelte";
  onMount(() => {
    canvasApp();
  });

  function canvasApp() {
    var canvas = document.getElementById("canvasOne");
    var ctx = canvas.getContext("2d");

    var w = (canvas.width = window.innerWidth);
    var h = (canvas.height = window.innerHeight);

    function reOffset() {
      var BB = canvas.getBoundingClientRect();
      offsetX = BB.left;
      offsetY = BB.top;
    }

    var offsetX, offsetY;
    reOffset();

    window.onscroll = function(e) {
      reOffset();
    };

    window.onresize = function(e) {
      reOffset();
    };

    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("touchmove", mouseMove, false);

    function draw(cx, cy, radius) {
      ctx.save();
      ctx.clearRect(0, 0, w, h);

      var radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);

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
    draw(w / 2, h / 2, 400);
  }
</script>

<style>
  canvas {
    position: fixed;
  }
</style>

<!-- <script>
  import { onMount } from "svelte";
  let canvas, ctx;

  onMount(() => {
    canvas = document.getElementById("mask");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ctx.globalCompositeOperation = "hue";

    // ctx.filter = "blur(4px)";
    ctx.filter = "blur(25px)"; // "feather"

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.clip();
    ctx.filter = "none";

    var background = new Image();
    background.src = "./img/dummy1.jpg";
    background.onload = function() {
      ctx.drawImage(background, 0, 0);
    };
  });
</script> -->
<canvas id="canvasOne" width="500" height="300" />
<img src="./img/dummy1.jpg" alt="" />
