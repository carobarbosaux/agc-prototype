// ==========================================================================
// PRODI DESIGN SYSTEM — Tailwind Typography Extension
// Source: Design System / Prodi (Figma)
//
// Usage:
//   Import in tailwind.config.js / tailwind.config.ts:
//   const prodiTypography = require('./prodi-tailwind-typography');
//   module.exports = { theme: { extend: prodiTypography } }
// ==========================================================================

/** @type {import('tailwindcss').Config['theme']} */
const prodiTypography = {
  fontFamily: {
    prodi: ["'Proeduca Sans'", "system-ui", "-apple-system", "sans-serif"],
  },

  fontSize: {
    // Headers
    "prodi-h1":       ["1.875rem", { lineHeight: "1.3" }],   // 30px
    "prodi-h2":       ["1.75rem",  { lineHeight: "1.3" }],   // 28px
    "prodi-h3":       ["1.625rem", { lineHeight: "1.3" }],   // 26px
    "prodi-h4":       ["1.5rem",   { lineHeight: "1.3" }],   // 24px
    "prodi-h5":       ["1.375rem", { lineHeight: "1.3" }],   // 22px
    "prodi-h6":       ["1.125rem", { lineHeight: "1.3" }],   // 18px
    // Body
    "prodi-m":        ["1rem",     { lineHeight: "1.5" }],   // 16px
    "prodi-s":        ["0.875rem", { lineHeight: "1.5" }],   // 14px
    "prodi-xs":       ["0.75rem",  { lineHeight: "1.5" }],   // 12px
    "prodi-footnote": ["0.625rem", { lineHeight: "1.2" }],   // 10px
  },

  fontWeight: {
    "prodi-regular":  "400",
    "prodi-medium":   "500",
    "prodi-semibold": "600",
  },
};

module.exports = prodiTypography;
