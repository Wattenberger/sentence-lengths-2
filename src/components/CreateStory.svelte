<script>
  import { parseSample } from "./../utils/constants";
  import Story from "./Story.svelte";

  export let parsedSample = "";
  export let text = "";

  const onParseSample = () => {
    parsedSample = parseSample(text);
  };
  $: text, onParseSample();
</script>

<div class="c">
  <div class="create">
    <h6>Paste your text in here:</h6>
    <textarea bind:value="{text}"></textarea>
  </div>
  <Story {...parsedSample} />
</div>

<style>
  .create {
    padding: 2em 2.3em 0;
    margin-bottom: -1em;
  }
  textarea {
    width: 100%;
    min-height: 10em;
    appearance: none;
    padding: 1em;
    border: 1px dashed #ddd;
    font-size: 1.1em;
    line-height: 1.4em;
    border-radius: 1em;
    max-width: calc(90vw - 23em);
  }
  textarea:focus {
    border: 1px dashed #b4dceb;
    outline: none;
  }
</style>
