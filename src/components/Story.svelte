<script>
  import { fly } from "svelte/transition";
  // import { interpolateRdYlBu } from "d3-scale-chromatic";
  // import { interpolateHcl } from "d3-interpolate";
  import letterSwitch from "./../utils/letterSwitch"
  import {maxLength, colorScale} from "./../utils/constants"

  export let averageLength = 0;
  export let counts = 0;
  export let name = "";
  export let paragraphs = [];
  export let text = "";
  export let author = "";

</script>

<div class="c">
  {#key name}
    {#if name}
      <h1 in:letterSwitch="{{ duration: 1000, delay: 300 }}" out:letterSwitch="{{ duration: 500 }}">{name}</h1>
    {/if}
    <div class="story">
      {#each paragraphs as paragraph, i}
        <p in:fly="{{ y: 30, delay: 500 + Math.min(900, i * 160) }}" out:fly="{{ y: 30 }}">
          {#each paragraph as sentence}
            <span
              class="sentence"
              style="background: {colorScale(Math.min(maxLength, sentence.split(' ').length))}">
              {sentence}
            </span>
          {/each}
        </p>
      {/each}
    </div>
  {/key}
</div>

<style>
  h1 {
    font-weight: 800;
    font-style: italic;
  }
  .c {
    max-width: 50em;
    padding: 2em;
    font-size: 1.2em;
    line-height: 1.6em;
  }
  .story {
    font-family: var(--font-serif);
  }
  .sentence {
    padding: 0.2em 0;
  }
</style>
