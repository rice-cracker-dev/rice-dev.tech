import type { Range } from '@/components/RangeSliders.svelte';
import Color from 'colorjs.io';

export interface PaletteStep {
  step: number;
  color: Color;
}

export interface GeneratePaletteOptionsV2 {
  steps: number[];
  baseIndex: number;
  fSaturation: number;
  fLightness: number;
  lightnessRange: Range;
  saturationRange: Range;
}

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const generatePaletteV2 = (
  color: Color,
  {
    steps,
    baseIndex,
    fSaturation,
    fLightness,
    lightnessRange,
    saturationRange,
  }: GeneratePaletteOptionsV2
): PaletteStep[] => {
  const { h, s, l } = color.to('hsl').hsl;
  console.log(h, s, l);

  return steps.map((step, stepIndex) => {
    const dist = baseIndex - stepIndex;

    return {
      step,
      color: new Color('hsl', [
        h + dist * 2,
        clamp(s + dist * fSaturation, saturationRange[0], saturationRange[1]),
        clamp(l + dist * fLightness, lightnessRange[0], lightnessRange[1]),
      ]),
    };
  });
};
