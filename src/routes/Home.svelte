<script>
  import { onMount } from "svelte";
  import NavLink from "../components/NavLink.svelte";
  import spotlightBackground from "../functions/spotlightBackground.js";

  onMount(() => {
    spotlightBackground({
      spotSize: 400,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      gradientColor: [
        "rgba(0, 0, 0, 0.3)",
        "rgba(0, 0, 0, 0.3)",
        "rgba(0, 0, 0, 0)"
      ]
    });
  });
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
