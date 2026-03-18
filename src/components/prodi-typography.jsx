// ==========================================================================
// PRODI DESIGN SYSTEM — React Typography Components
// Source: Design System / Prodi (Figma)
//
// Usage:
//   import { Heading, Text, prodiClass } from './prodi-typography';
//
//   <Heading level={1}>Page title</Heading>
//   <Text size="m" weight="medium">Body copy</Text>
//   <Text variant="footnote" weight="bold">Fine print</Text>
//   <h2 className={prodiClass.h2}>Section</h2>
// ==========================================================================

import React from 'react';

const FONT_FAMILY = "'Proeduca Sans', system-ui, -apple-system, sans-serif";

const WEIGHT_MAP = { regular: 400, medium: 500, bold: 600 };

const HEADING_SIZE = {
  1: '1.875rem',
  2: '1.75rem',
  3: '1.625rem',
  4: '1.5rem',
  5: '1.375rem',
  6: '1.125rem',
};

const TEXT_SIZE = { m: '1rem', s: '0.875rem', xs: '0.75rem' };

const FOOTNOTE_SIZE = '0.625rem';

/** Renders h1–h6 with Prodi tokens. All headings use SemiBold (600). */
export const Heading = React.forwardRef(({ level, as, style, children, ...rest }, ref) => {
  const Tag = as ?? `h${level}`;
  return (
    <Tag
      ref={ref}
      style={{
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        fontSize: HEADING_SIZE[level],
        lineHeight: 1.3,
        letterSpacing: 0,
        margin: 0,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
});
Heading.displayName = 'Heading';

/** Flexible body text. Covers Text M/S/XS, Footnote, and Form variants. */
export const Text = React.forwardRef(
  ({ size = 'm', weight = 'regular', variant = 'text', as, style, children, ...rest }, ref) => {
    const Tag = as ?? 'p';
    const isFootnote = variant === 'footnote';
    return (
      <Tag
        ref={ref}
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: WEIGHT_MAP[weight],
          fontSize: isFootnote ? FOOTNOTE_SIZE : TEXT_SIZE[size],
          lineHeight: isFootnote ? 1.2 : 1.5,
          letterSpacing: 0,
          margin: 0,
          ...style,
        }}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);
Text.displayName = 'Text';

/** Tailwind class-name helper — use with prodi-tailwind-typography.js tokens */
export const prodiClass = {
  h1: 'font-prodi text-prodi-h1 font-prodi-semibold',
  h2: 'font-prodi text-prodi-h2 font-prodi-semibold',
  h3: 'font-prodi text-prodi-h3 font-prodi-semibold',
  h4: 'font-prodi text-prodi-h4 font-prodi-semibold',
  h5: 'font-prodi text-prodi-h5 font-prodi-semibold',
  h6: 'font-prodi text-prodi-h6 font-prodi-semibold',

  textMBold:    'font-prodi text-prodi-m font-prodi-semibold',
  textMMedium:  'font-prodi text-prodi-m font-prodi-medium',
  textMRegular: 'font-prodi text-prodi-m font-prodi-regular',

  textSBold:    'font-prodi text-prodi-s font-prodi-semibold',
  textSMedium:  'font-prodi text-prodi-s font-prodi-medium',
  textSRegular: 'font-prodi text-prodi-s font-prodi-regular',

  textXsBold:    'font-prodi text-prodi-xs font-prodi-semibold',
  textXsMedium:  'font-prodi text-prodi-xs font-prodi-medium',
  textXsRegular: 'font-prodi text-prodi-xs font-prodi-regular',

  footnoteBold:    'font-prodi text-prodi-footnote font-prodi-semibold',
  footnoteMedium:  'font-prodi text-prodi-footnote font-prodi-medium',
  footnoteRegular: 'font-prodi text-prodi-footnote font-prodi-regular',

  formMMedium:  'font-prodi text-prodi-m font-prodi-medium',
  formMRegular: 'font-prodi text-prodi-m font-prodi-regular',
  formSMedium:  'font-prodi text-prodi-s font-prodi-medium',
  formSRegular: 'font-prodi text-prodi-s font-prodi-regular',
};
