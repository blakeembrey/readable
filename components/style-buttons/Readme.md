# Style Buttons

Beautiful and consistent cross-browser CSS buttons. Supports multiple colored versions, as well as disabled, focus, hover and active states. Even includes a `quiet` state (no gradients) and a `pill` state (rounded corners).

## Installation

```
$ bower install style-buttons
$ component install blakeembrey/style-buttons
$ npm install style-buttons --save
```

## Stylus API

```
// Using the base variables means it matches the rest of the sites design
base-font-size     = 100%
base-line-height   = 1.5
base-border-radius = 3px

// Plenty of built in button styles, as well a customizable base class name
buttons-class-name                   = "btn"

buttons-background                   = #f5f8fa
buttons-background-highlight         = #e3e5e5

buttons-primary-background           = #08c
buttons-primary-background-highlight = darken(buttons-primary-background, 10%)

buttons-info-background              = #5bc0de
buttons-info-background-highlight    = #2f96b4

buttons-success-background           = #62c462
buttons-success-background-highlight = #51a351

buttons-warning-background           = lighten(#f89406, 15%)
buttons-warning-background-highlight = #f89406

buttons-danger-background            = #ee5f5b
buttons-danger-background-highlight  =  #bd362f

buttons-inverse-background           = #7a7c7c
buttons-inverse-background-highlight = #5f6060
```

This is the base configuration, all variables be overriden ahead of time. This will give a few base button classes available for use.

## CSS API

```
.btn // Base button class
.btn-(primary|info|success|warning|danger|inverse) // Extending classes - each with a unique color and style
.btn-quiet // Removes the gradient for a flatter button
.btn-pill // Gives all the buttons rounded corners
.btn.disabled, .btn[disabled] // Styles the button as disabled and stops hover actions
.btn-block // Full width button
```

By default, all the classes work on all the diferent colored buttons. You can easily add more buttons using the Stylus API.

## License

MIT
