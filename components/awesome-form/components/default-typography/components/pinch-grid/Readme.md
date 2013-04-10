# Pinch Grid

Powerful fluid grid generator for Stylus and CSS. Using `inline-block` and `box-sizing` for pure awesomeness. It is built as a dropin replacement for most other grids, noteably Bootstrap, but it can be used for sizing almost any element - not just grids.

Currently generating the grid within a media query doesn't work. It's just waiting for [this pull request](https://github.com/LearnBoost/stylus/pull/964) to be accepted, and it'll start working.

## Installation

```
$ bower install pinch-grid
$ npm install pinch-grid --save
$ component install blakeembrey/pinch-grid
```

## Stylus API

```
// Enable Bootstrap support for the `.offset` class and no grid prefix
support-for-bootstrap = false

// Support for old IE - currently enables the `rem` to `px` fallback for IE8
support-for-ie = true

// Grid system configuration
grid-prefix       = "grid" // Prefix all grid classes with this variable (disabled with Bootstrap support)
grid-alignment    = left // Alignment of the grid columns within a grid row
grid-gutter-width = 1.5rem // Gutter spacing between grid columns
grid-force-suffix = false // Force the suffix for single column count grids

grid-generate(columns, prefix)


grid-generate(6 12)

// Results in two grids
.grid-(span|push|pull|prefix|suffix)([0-6])of6
.grid-(span|push|pull|prefix|suffix)([0-12])of12

grid-prefix = "" // Disable grid class prefixing

grid-generate(12)

// Results in a single unprefixed grid without the `of(x)` syntax
.(span|push|pull|prefix|suffix)([0-12])

grid-prefix = "grid"
support-for-bootstrap = true

grid-generate(12)

// Results in a single unprefixed grid with an `.offset(x)` class
.(span|push|pull|prefix|offset|suffix)([0-12])

support-for-bootstrap = false

grid-generate(12, "desktop")

// Results in a grid prefixed and class prefixed grid output
.grid-desktop-(span|push|pull|prefix|suffix)([0-12])
```

## CSS API

```
.grid-container /* Use this class for the page conatiner */
.grid-row /* Use this class to mark up a grid row */
.grid-span(x) /* This element span 100% / 12 * `x` width */
.grid-(push|pull)(x) /* Use these classes to rearrange markup for SEO or device context */
.grid-(prefix|suffix)(x) /* Use these classes to prepend or append `x` width worth of whitespace */
```

By default the CSS grid is built for a single viewport and twelve columns. Using the Stylus API you can easily generate a number of different grid columns at different viewport sizes.

## License

MIT
