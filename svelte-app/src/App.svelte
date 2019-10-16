<script>
  import Item from "./Item.svelte";
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

<style type="text/scss">
  $color: green;
  $black: #000;

  h1 {
    color: $color;
  }

  div {
    background: green;

    > p {
      color: #fff;
    }
  }
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
