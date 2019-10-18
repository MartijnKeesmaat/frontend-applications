<script>
  export let results;
</script>

{#if results.length > 0}
  <h2>{results[0].title}</h2>
  <p>{results[0].description}</p>
  <img src={results[0].imageLink} alt="" />

  {#each results as { id, title, description, imageLink }, i}
    <h2>{title}</h2>
    <p>{description}</p>
    <img src={imageLink} alt="" />
  {/each}
{:else}
  <p>Loading</p>
{/if}
