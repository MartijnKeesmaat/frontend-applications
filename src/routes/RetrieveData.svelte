<script>
  import { onMount } from "svelte";
  export let results;

  const waitForResults = () => {
    if (results.length === 0) {
      setTimeout(waitForResults, 50);
      return;
    }
    handleResults();
  };

  waitForResults();
  let photos = [];

  function handleResults() {
    let data = [...results];

    // https://firstclassjs.com/remove-duplicate-objects-from-javascript-array-how-to-performance-comparison/
    function removeDuplicates(array, key) {
      let lookup = new Set();
      return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]));
    }
    photos = removeDuplicates(data, "imageLink");
  }
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
