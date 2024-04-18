// uno.config.ts
import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

const margins = {
  t: 'margin-top',
  b: 'margin-bottom',
  l: 'margin-left',
  r: 'margin-right',
}

const paddings = {
  t: 'padding-top',
  b: 'padding-bottom',
  l: 'padding-left',
  r: 'padding-right',
}

export default defineConfig({
  // padding margin width height 单位都改为px
  rules: [
    [
      /^m(t|l|r|b|)-([.\d]+)$/,
      ([, direction, num]) => ({ [margins[direction] ?? 'margin']: `${num}px` }),
    ],
    [
      /^p(t|l|r|b|)-([.\d]+)$/,
      ([, direction, num]) => ({ [paddings[direction] ?? 'padding']: `${num}px` }),
    ],
    [/^w-([.\d]+)$/, ([, num]) => ({ width: `${num}px` })],
    [/^h-([.\d]+)$/, ([, num]) => ({ height: `${num}px` })],
    ['text-primary', { color: 'var(--feGitStat-color-primary)' }],
    ['text-danger', { color: 'var(--feGitStat-color-danger)' }],
  ],
  transformers: [transformerDirectives()],
})
