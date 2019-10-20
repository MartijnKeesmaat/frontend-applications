<script>
  import { onMount } from "svelte";
  import NavLink from "../components/NavLink.svelte";
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
  .hero {
    position: relative;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    max-width: 900px;
    height: 100vh;
    margin: 0 auto;

    color: #fff;
  }

  .hero__intro {
    max-width: 507px;
  }

  .hero__cta a {
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none !important;

    color: #fff;
  }

  .hero__cta:hover .button-round {
    cursor: pointer;

    border: 2px solid rgba(255, 255, 255, 0.6);
  }

  .hero__cta:hover .title-main {
    transform: translateX(2px);
  }

  .hero__cta:hover .title-highlight {
    transform: translateX(4px);
  }

  .hero__cta:hover .button-round img {
    transform: rotate(-30deg);
  }

  .hero__cta .button-round {
    margin-right: 15px;
  }
</style>

<div class="mask-wrapper">
  <canvas id="mask" width="500" height="300" />
  <img id="bg-img" src="./img/dummy1.jpg" alt="" />
</div>

<section class="hero">
  <div class="hero__intro">
    <h1 class="title-main">
      Wat is jouw
      <span class="title-highlight">Perspectief</span>
    </h1>
    <p class="body">
      Na de uitvinding van de fotografie in 1839 werd de rol van de expeditie
      overgenomen door de fotograaf. Landschappen, mensen en hun
      leefomstandigheden waren de belangrijkste onderwerpen. Het is aan jou de
      taak om deze zo goed mogelijk vast te leggen.
    </p>
  </div>

  <div class="hero__cta">
    <NavLink to="video">
      <a href="nou en">
        <span class="button-round">
          <img src="icons/arrow.svg" alt="" />
        </span>
        <h3 class="title-main">
          Vertel
          <span class="title-highlight">Je verhaal</span>
        </h3>
      </a>
    </NavLink>
  </div>
</section>
