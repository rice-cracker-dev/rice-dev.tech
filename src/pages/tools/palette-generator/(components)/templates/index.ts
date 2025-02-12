import type { PaletteStep } from '..';
import { tailwindTransformer } from './tailwindcss';

export interface PaletteStepTransformer {
  name: string;
  process: (step: PaletteStep) => string;
}

export interface PaletteTransformer {
  name: string;
  stepTransformers: PaletteStepTransformer[];
  process: (
    steps: PaletteStep[],
    transformer: PaletteStepTransformer
  ) => string;
}

export const transformers: PaletteTransformer[] = [tailwindTransformer];
