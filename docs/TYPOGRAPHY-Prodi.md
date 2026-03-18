# Prodi Design System — Typography Reference

> **Source:** Design System / Prodi (Figma)  
> **Font:** Proeduca Sans (Regular 400 · Medium 500 · SemiBold 600)  
> **Letter spacing:** 0% across all styles

## Scale

| Token              | px  | rem      | Weight   | Category |
|--------------------|-----|----------|----------|----------|
| H1-global          | 30  | 1.875    | SemiBold | Header   |
| H2-global          | 28  | 1.75     | SemiBold | Header   |
| H3-global          | 26  | 1.625    | SemiBold | Header   |
| H4-global          | 24  | 1.5      | SemiBold | Header   |
| H5-global          | 22  | 1.375    | SemiBold | Header   |
| H6-global          | 18  | 1.125    | SemiBold | Header   |
| Text M             | 16  | 1        | R / M / SB | Body   |
| Text S             | 14  | 0.875    | R / M / SB | Body   |
| Text XS            | 12  | 0.75     | R / M / SB | Body   |
| Footnote           | 10  | 0.625    | R / M / SB | Body   |
| Form M             | 16  | 1        | R / M      | Form   |
| Form S             | 14  | 0.875    | R / M      | Form   |

*R = Regular 400 · M = Medium 500 · SB = SemiBold 600*

## Files

| File                          | Purpose                              |
|-------------------------------|--------------------------------------|
| `prodi-typography.css`        | CSS custom properties + utility classes |
| `prodi-tailwind-typography.js`| Tailwind `theme.extend` config       |
| `ProdiTypography.tsx`         | React `<Heading>` & `<Text>` + `prodiClass` map |

## Quick usage

### CSS classes
```html
<h1 class="prodi-h1">Title</h1>
<p class="prodi-text-m-regular">Body copy</p>
<span class="prodi-footnote-medium">Legal</span>
```

### Tailwind
```html
<h1 class="font-prodi text-prodi-h1 font-prodi-semibold">Title</h1>
<p class="font-prodi text-prodi-m font-prodi-regular">Body</p>
```

### React components
```tsx
import { Heading, Text } from '@/components/prodi-typography';

<Heading level={1}>Page title</Heading>
<Text size="m" weight="medium">Body copy</Text>
<Text variant="footnote" weight="bold">Fine print</Text>
```

### Tailwind class helper
```tsx
import { prodiClass } from '@/components/prodi-typography';

<h2 className={prodiClass.h2}>Section</h2>
<p className={prodiClass.textSRegular}>Description</p>
```
