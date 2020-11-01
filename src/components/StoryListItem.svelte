<script>
  import Histogram from "./Histogram.svelte";

  export let sentenceLengths = [];
  export let name = "";
  export let author = "";
  export let isSelected = false;
  export let onSelect = () => {};
</script>

<button class="c" class:is-selected="{isSelected}" on:click="{onSelect}">
  <div class="name">{name}</div>
  <div class="author">{author}</div>
  <Histogram data="{sentenceLengths}" />
</button>

<style>
  .c {
    position: relative;
    appearance: none;
    box-shadow: none;
    outline: none;
    border: none;
    /* border-top: 1px solid transparent; */
    border-bottom: 1px solid #e6ecf2;
    background: none;
    font-size: 1em;
    text-align: left;
    width: 100%;
    padding: 0.8em 0.8em;
    cursor: pointer;
  }
  .is-selected {
    color: var(--ac);
    border-bottom-color: #e6ecf2;
  }
  .c:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 0.1em;
  }
  .is-selected:before {
    background: var(--ac);
  }
  .c:not(.is-selected):focus:before {
    background: #ea8685;
  }
  .name {
    font-weight: 600;
    padding-right: 2em;
  }
  .author {
    margin: 0.2em 0 0.7em;
    font-size: 0.8em;
    color: #7f7c8a;
    font-weight: 300;
  }
</style>
