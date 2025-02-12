/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  htmlWhitespaceSensitivity: 'css',
  trailingComma: 'es5',
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-svelte',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },

    { files: '*.svelte', options: { parser: 'svelte' } },
  ],
};
