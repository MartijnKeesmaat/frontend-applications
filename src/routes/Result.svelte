<script>
  import { onMount } from "svelte";
  onMount(() => {});
</script>

<style>
  .bg-img {
    background: url("img/dummy4.jpg");
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-size: cover;
  }

  .bg-img:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 15, 20, 0.6);
  }

  .story-header {
    font-size: 58px;
    color: #fff;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 40px;
  }

  .story-header:last-child {
    margin-bottom: 0;
  }

  .content {
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 1020px;
    overflow: scroll;
    max-height: 90vh;
    margin-top: 10vh;
    padding-bottom: 10vh;
    padding-top: 15vh;
  }

  .content-scroll:hover {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -o-animation-play-state: paused;
    animation-play-state: paused;
  }

  @keyframes scroll-page {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-50%);
    }
  }

  .story-chapter {
    margin-top: 50px;
  }

  .story-chapter--mirror .story__intro {
    margin-left: 30px;
  }

  .story-chapter--mirror .story__moment-container {
    flex-direction: row-reverse;
  }

  .story__count {
    margin: 0;
    line-height: 1;
  }
  .story__current-count {
    font-size: 338px;
    color: #ffe6a0;
    font-weight: 300;
    letter-spacing: -9px;
  }
  .story__total-count {
    font-size: 68px;
    font-weight: 300;
    color: #fff;
    padding-left: 20px;
  }

  .story__chapter-name {
    text-transform: uppercase;
    font-style: italic;
    font-weight: 600;
    letter-spacing: 4px;
    font-size: 20px;
    color: #fff;
    margin-left: 20px;
    margin-top: 5px;
  }

  .story__intro:nth-child(1) {
    margin-left: calc(50% + 30px);
  }

  .story__moment-container {
    display: flex;
  }

  .story-intro {
    margin: 80px 0;
  }

  .stories:last-child {
    padding-top: 25%;
  }

  .story__moment {
    max-width: 517px;
    margin: 40px;
    margin-bottom: 70px;
  }

  .story__moment-img {
    max-width: 100%;
    object-fit: cover;
    max-height: 300px;
    width: 100%;
  }

  .story__moment figcaption {
    color: #fff;
    font-size: 16px;
    font-family: "Source Sans Pro", sans-serif;
    line-height: 1.5;
    margin-top: 7px;
    opacity: 0.85;
  }
</style>

<div class="bg-img" />

<div class="content">
  <div class="content-scroll">

    <section class="story-intro">
      <h2 class="story-header">The war left it's mark on many families</h2>
      <h2 class="story-header">Ours was no exception</h2>
    </section>

    <section class="story-chapter">
      <div class="story__intro">
        <h3 class="story__count">
          <span class="story__current-count">01</span>
          <span class="story__total-count">/03</span>
        </h3>
        <div class="story__chapter-name">Onafhankelijkheid</div>
      </div>

      <div class="story__moment-container">
        <div class="stories">
          <figure class="story__moment background">

            <img
              class="story__moment-img background"
              src={localStorage.getItem('snapshot1')}
              alt="" />
            <!-- <img
              class="story__moment-img background"
              src="/img/dummy4.jpg"
              alt="" /> -->
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>

          <figure class="story__moment">
            <img
              class="story__moment-img background"
              src="/img/dummy5.jpg"
              alt="" />
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>
        </div>

        <div class="stories">
          <figure class="story__moment">
            <img class="story__moment-img" src="/img/dummy6.jpg" alt="" />
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="story-intro">
      <h2 class="story-header">The war left it's mark on many families</h2>
      <h2 class="story-header">Ours was no exception</h2>
    </section>

    <section class="story-chapter story-chapter--mirror">
      <div class="story__intro">
        <h3 class="story__count">
          <span class="story__current-count">02</span>
          <span class="story__total-count">/03</span>
        </h3>
        <div class="story__chapter-name">Onafhankelijkheid</div>
      </div>

      <div class="story__moment-container">
        <div class="stories">
          <figure class="story__moment">

            {#if localStorage.getItem('snapshot1') === true}
              <img
                class="story__moment-img"
                src={localStorage.getItem('snapshot1')}
                alt="" />
            {:else}
              <img class="story__moment-img" src="/img/dummy4.jpg" alt="" />
            {/if}
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>

          <figure class="story__moment">
            <img class="story__moment-img" src="/img/dummy5.jpg" alt="" />
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>
        </div>

        <div class="stories">
          <figure class="story__moment">
            <img class="story__moment-img" src="/img/dummy6.jpg" alt="" />
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="story-intro">
      <h2 class="story-header">The war left it's mark on many families</h2>
      <h2 class="story-header">Ours was no exception</h2>
    </section>

    <section class="story-chapter">
      <div class="story__intro">
        <h3 class="story__count">
          <span class="story__current-count">03</span>
          <span class="story__total-count">/03</span>
        </h3>
        <div class="story__chapter-name">Onafhankelijkheid</div>
      </div>

      <div class="story__moment-container">
        <div class="stories">
          <figure class="story__moment">

            {#if localStorage.getItem('snapshot1') === true}
              <img
                class="story__moment-img"
                src={localStorage.getItem('snapshot1')}
                alt="" />
            {:else}
              <img class="story__moment-img" src="/img/dummy4.jpg" alt="" />
            {/if}
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>

          <figure class="story__moment">
            <img class="story__moment-img" src="/img/dummy5.jpg" alt="" />
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>
        </div>

        <div class="stories">
          <figure class="story__moment">
            <img class="story__moment-img" src="/img/dummy6.jpg" alt="" />
            <figcaption>
              Na de uitvinding van de fotografie in 1839 werd de rol van de
              expeditie overgenomen door de fotograaf. Landschappen, mensen en
              hun leefomstandigheden waren de belangrijkste onderwerpen.
            </figcaption>
          </figure>
        </div>
      </div>

    </section>

  </div>
</div>
