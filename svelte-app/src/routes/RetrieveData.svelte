<script>
  export let results;
</script>

{#if results.length > 0}
  <h2>{results[0].title.value}</h2>
  <p>{results[0].description.value}</p>
  <img src={results[0].imageLink.value} alt="" />
{:else}
  <p>Loading</p>
{/if}
