<script>
  import Item from "../components/ListItem.svelte";
  let name = "world";
  let count = 0;

  function handleClick() {
    count += 1;
  }

  let dummyData = [
    { name: "This is a component" },
    { name: "This is a component" },
    { name: "This is a component" }
  ];
</script>

<style>

</style>

<h1>Hello {name} {count}!</h1>

<ul>
  {#each dummyData as { id, name }, i}
    <Item {name} />
  {/each}
</ul>

<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
