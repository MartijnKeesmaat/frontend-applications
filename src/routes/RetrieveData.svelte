<script>
  export let results;
</script>

{#if results.length > 0}
  {#each results as { id, title, description, imageLink }, i}
    <h2>{title}</h2>
    <p>{description}</p>
    <img src={imageLink} alt="" />
    {imageLink}
  {/each}
{:else}
  <p>Loading</p>
{/if}
