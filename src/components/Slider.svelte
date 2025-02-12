<script lang="ts" module>
  export interface BaseProps {
    min: number;
    max: number;
    step: number;
  }

  export interface Props extends BaseProps {
    label: string;
    value: number;
  }
</script>

<script lang="ts">
  let { label, value = $bindable(), min, max, step }: Props = $props();
</script>

<label class="label">
  <span>{label}</span>

  <input type="range" class="range" {min} {max} {step} bind:value />

  <span>{value}</span>
</label>
