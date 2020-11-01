<script>
  import Story from "./Story.svelte";
  import StoryListItem from "./StoryListItem.svelte";
  import CreateStory from "./CreateStory.svelte";

  import samples from "./../samples";

  let selectedStoryIndex = 1;
  let createStorySample = {};
  let createStoryText = "";

  $: selectedStory = samples[selectedStoryIndex - 1];

  const onSelect = () => {
    window.scrollTo(0, {});
  };
  $: selectedStoryIndex, onSelect();
</script>

<div class="c">
  <main class="story">
    {#if selectedStoryIndex > 0}
      <Story {...selectedStory} />
    {:else}
      <CreateStory
        bind:parsedSample="{createStorySample}"
        bind:text="{createStoryText}" />
    {/if}
  </main>
  <div class="options">
    <div class="note">
      <p>
        How do different writers vary their sentence length? See how some
        authors play with different lengths, while others stick with one.
        <br />
        <br />
        Made with 💗 by
        <a href="http://wattenberger.com">Amelia Wattenberger</a>

      </p>
    </div>
    <div class="mobile">
      <select bind:value="{selectedStoryIndex}">
        {#each [{ name: '+ Create your own' }, ...samples] as { name }, i}
          <option value="{i}">{name}</option>
        {/each}
      </select>
    </div>
    <div class="list">
      <h6>Stories</h6>
      <StoryListItem
        name="+ Create your own"
        {...createStorySample}
        isSelected="{selectedStoryIndex == 0}"
        onSelect="{() => (selectedStoryIndex = 0)}" />
      <div class="samples">
        {#each samples as sample, i}
          <StoryListItem
            {...sample}
            isSelected="{selectedStoryIndex == i + 1}"
            onSelect="{() => (selectedStoryIndex = i + 1)}" />
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .c {
    position: relative;
    display: flex;
    --ac: #e66767;
  }
  .story {
    flex: 1;
  }
  .options {
    position: absolute;
    top: 2em;
    right: 1em;
    height: 90vh;
    overflow: hidden;
    max-width: 22em;
    display: flex;
    flex-direction: column;
    /* position: sticky; */
    background: #fff;
    top: 2em;
    padding-top: 1em;
    /* box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3); */
    /* background: #f6f9fc; */
  }
  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid #e6ecf2;
    border-radius: 0.6em;
    overflow: hidden;
  }
  .samples {
    /* height: 90vh; */
    overflow: auto;
    flex: 1;
  }
  .note {
    padding: 1em;
    padding-top: 0;
  }
  .options h6 {
    margin-left: 0.9rem;
    margin: 1em;
    margin-bottom: 0.3em;
  }
  .options a {
    color: var(--ac);
  }

  ::-moz-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar {
    width: 9px;
  }

  ::-moz-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
    background: var(--clue-scrollbar-bg, #efefef);
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 10px;
    background: var(--clue-scrollbar-bg, #efefef);
  }
  ::scrollbar-thumb {
    border-radius: 10px;
    background: var(--clue-scrollbar-fg, #cdcdcd);
    box-shadow: none;
  }
  ::-moz-scrollbar-thumb {
    background: var(--clue-scrollbar-fg, #cdcdcd);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--clue-scrollbar-fg, #cdcdcd);
    border-radius: 6px;
  }

  @media (min-width: 1000px) {
    .story {
      max-width: calc(100vw - 23em);
    }
    .mobile {
      display: none;
    }
  }
  @media (max-width: 1000px) {
    .c {
      flex-direction: column;
    }
    .options {
      order: 1;
      max-width: none;
      padding: 2em;
      padding-top: 1em;
      padding-bottom: 0;
      position: relative;
      height: auto;
    }
    .story {
      order: 2;
    }
    .list {
      display: none;
    }
    .options select {
      padding: 0.3em;
      font-size: 1.3em;
      width: 100%;
      margin: 1em;
    }
  }
</style>
