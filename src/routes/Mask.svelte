<script>
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
</script>

<style>

</style>

<canvas id="mask" />
