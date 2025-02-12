<script lang="ts" module>
  import type { BaseProps } from './Slider.svelte';

  export type Range = [number, number];

  export interface Props extends BaseProps {
    labels: [string, string];
    values: Range;
  }
</script>

<script lang="ts">
  import Slider from './Slider.svelte';

  let { labels, values = $bindable(), min, max, step }: Props = $props();
</script>

<Slider {min} {max} {step} label={labels[0]} bind:value={values[0]} />
<Slider {min} {max} {step} label={labels[1]} bind:value={values[1]} />
