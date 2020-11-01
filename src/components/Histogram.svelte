<script>
  import { onMount } from "svelte";
  import { bin, range } from "d3-array";
  import { scaleLinear } from "d3-scale";
  import { area, line, curveBasis } from "d3-shape";
  import { interpolateCubehelix } from "d3-interpolate";
  import { maxLength, colorScale, getId } from "./../utils/constants";

  export let data = [];

  let id = 0;
  onMount(() => {
    id = getId();
  });

  const height = 1;
  const width = 10;

  $: bins = bin()
    .thresholds(range(0, 80, 5))
    .domain([0, 80])(data);
  $: xScale = scaleLinear()
    .domain([
      0,
      80
      // Math.min(...bins.map(d => d.x0)),
      // Math.max(...bins.map(d => d.x0))
    ])
    .range([0, width]);
  $: yScale = scaleLinear()
    .domain([0, Math.max(...bins.map(d => d.length))])
    .range([height, 0]);
  $: areaPath = area()
    .x(d => xScale(d.x0))
    .y1(d => yScale(d.length))
    .y0(height)
    .curve(curveBasis)(bins);
  $: linePath = line()
    .x(d => xScale(d.x0))
    .y(d => yScale(d.length))
    .curve(curveBasis)(bins);

  $: colorTicks = colorScale.ticks();
  $: stopOffsetRatio = (xScale(maxLength) * 100) / width;
</script>

<div class="c">
  <svg viewBox="0 0 {width} {height}" preserveAspectRatio="none">
    <defs>
      <linearGradient id="Histogram__gradient--{id}" x2="{stopOffsetRatio}%">
        {#each colorTicks as stop}
          <stop stop-color="{colorScale(stop)}" offset="{stop}%"></stop>
        {/each}
      </linearGradient>
    </defs>
    <path d="{areaPath}" fill="url(#Histogram__gradient--{id})"></path>
    <path d="{linePath}" class="line"></path>
  </svg>
</div>

<style>
  .c {
    width: 100%;
    height: 2em;
  }
  svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .line {
    fill: none;
    stroke: #e6ecf2;
    stroke-width: 0.03;
  }
</style>
