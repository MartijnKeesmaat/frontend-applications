<script>
  import { onMount } from "svelte";
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

    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("touchmove", mouseMove, false);

    draw(w / 2, h / 2, 400);
  }
</script>

<style>
  canvas {
    position: fixed;
    z-index: 2;
  }

  #bg-img {
    position: fixed;
    z-index: 1;
  }
</style>

<canvas id="mask" width="500" height="300" />
<img id="bg-img" src="./img/dummy1.jpg" alt="" />
