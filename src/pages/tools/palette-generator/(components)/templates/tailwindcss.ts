import type { PaletteStepTransformer, PaletteTransformer } from '.';

export const hexStepTransformer: PaletteStepTransformer = {
  name: 'HEX',
  process: (step) => {
    return step.color.to('srgb').toString({ format: 'hex' });
  },
};

export const rgbStepTransformer: PaletteStepTransformer = {
  name: 'RGB',
  process: (step) => {
    return step.color.to('srgb').toString({ format: 'rgb' });
  },
};

export const hslStepTransformer: PaletteStepTransformer = {
  name: 'HSL',
  process: (step) => {
    return step.color.toString({ format: 'hsl' });
  },
};

export const oklchStepTransformer: PaletteStepTransformer = {
  name: 'OKLCH',
  process: (step) => {
    return step.color.to('oklch').toString({ format: 'oklch' });
  },
};

export const tailwindTransformer: PaletteTransformer = {
  name: 'TailwindCSS 4',
  stepTransformers: [
    hexStepTransformer,
    rgbStepTransformer,
    hslStepTransformer,
    oklchStepTransformer,
  ],
  process: (steps, transformer) => {
    const colors = steps
      .map((s) => `  --color-${s.step}: ${transformer.process(s)};`)
      .join('\n');

    return `@theme {\n${colors}\n}`;
  },
};
