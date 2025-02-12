<script lang="ts">
  import Icon from '@iconify/svelte';
  import Color from 'colorjs.io';
  import {
    type GeneratePaletteOptionsV2,
    type PaletteStep,
    generatePaletteV2,
  } from '.';
  import RangeSliders from '@/components/RangeSliders.svelte';
  import Slider from '@/components/Slider.svelte';
  import { transformers } from './templates';

  let colorInput = $state('');
  let templateIndex = $state(0);
  let stepTemplateIndex = $state(0);

  let options = $state<GeneratePaletteOptionsV2>({
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    baseIndex: 5,
    fLightness: 8,
    fSaturation: 5,
    saturationRange: [0, 100],
    lightnessRange: [0, 100],
  });

  let currentColor = $derived.by<Color | null>(() => {
    try {
      return new Color(colorInput);
    } catch {
      return null;
    }
  });

  let currentPalette = $derived.by<PaletteStep[] | null>(() => {
    if (!currentColor) return null;

    return generatePaletteV2(currentColor, options);
  });

  let currentCode = $derived.by<string | null>(() => {
    if (!currentPalette) return null;

    return transformers[templateIndex].process(
      currentPalette,
      transformers[templateIndex].stepTransformers[stepTemplateIndex]
    );
  });

  $effect(() => {
    if (templateIndex) {
      stepTemplateIndex = 0;
    }
  });
</script>

<section
  class="flex flex-col items-stretch xl:flex-row xl:items-start gap-16 mx-auto container px-4"
>
  <section class="flex flex-col gap-8 min-w-72">
    <section class="flex flex-col gap-2">
      <h2>Color</h2>

      <label class="input">
        <input
          type="color"
          class="size-4 border-none outline-none appearance-none"
          value={currentColor
            ? currentColor.toString({ format: 'hex' })
            : '#000000'}
          onchange={(e) => (colorInput = e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Pick a color"
          class="flex-1"
          bind:value={colorInput}
        />
        <button
          onclick={() =>
            (colorInput = new Color('hsl', [Math.random() * 360, 50, 50])
              .to('srgb')
              .toString({ format: 'hex' }))}
          class="btn btn-square btn-ghost btn-sm btn-neutral"
        >
          <Icon icon="ph:dice-five" class="text-lg" />
        </button>
      </label>

      <p class="text-xs italic opacity-60">
        &quot;Pick a color, any color.&quot;
      </p>
    </section>

    <section class="flex flex-col gap-2">
      <h2>Tweaks</h2>

      <Slider
        label="fLightness"
        min={0}
        max={100}
        step={1}
        bind:value={options.fLightness}
      />

      <Slider
        label="fSaturation"
        min={0}
        max={100}
        step={1}
        bind:value={options.fSaturation}
      />

      <RangeSliders
        labels={['minSaturation', 'maxSaturation']}
        min={0}
        max={100}
        step={1}
        bind:values={options.saturationRange}
      />
      <RangeSliders
        labels={['minLightness', 'maxLightness']}
        min={0}
        max={100}
        step={1}
        bind:values={options.lightnessRange}
      />
    </section>
  </section>

  {#if currentPalette}
    <section class="flex-1 flex flex-col items-stretch gap-8">
      <section class="flex flex-col items-stretch gap-2">
        <h2>Preview</h2>

        <div class="flex flex-col xl:flex-row items-stretch gap-4">
          {#each currentPalette as step, index}
            <button
              type="button"
              class={[
                'flex flex-col items-center justify-end grow p-4 xl:min-h-32 rounded-lg cursor-pointer',
                step.color.l > 50 ? 'text-black' : 'text-white',
              ]}
              style="background-color: {step.color.toString()};"
              onclick={() => (options.baseIndex = index)}
            >
              <Icon
                icon="ph:lock"
                class="mb-auto m-2 {index === options.baseIndex
                  ? 'opacity-100'
                  : 'opacity-0'}"
              />
              <p class="text-lg font-semibold">{step.step}</p>
              <p class="text-xs">
                {step.color.to('srgb').toString({ format: 'hex' })}
              </p>
            </button>
          {/each}
        </div>
      </section>

      <section class="flex flex-col items-stretch gap-2">
        <header class="flex items-center gap-4">
          <h2 class="flex-1">Code</h2>
          <select class="select" bind:value={templateIndex}>
            {#each transformers as transformer, index}
              <option value={index}>{transformer.name}</option>
            {/each}
          </select>
          <select class="select" bind:value={stepTemplateIndex}>
            {#each transformers[templateIndex].stepTransformers as transformer, index}
              <option value={index}>{transformer.name}</option>
            {/each}
          </select>
        </header>

        <section class="mockup-code w-full">
          <pre><code>{currentCode}</code></pre>
        </section>
      </section>
    </section>
  {/if}
</section>
