# Visible Element

[![NPM](https://nodei.co/npm/visible-element.png)](https://nodei.co/npm/visible-element/) [![Build Status](https://travis-ci.org/joeybaker/visible-element.png?branch=master)](https://travis-ci.org/joeybaker/visible-element)

For browsers only. Has two methods that allow you to detect if an element is visible to the user.

_NOTE: a DOM library (like jQuery) is required for one of the methods_

## Install
`npm install visible-element`

## Usage
```js
var $ = require('jquery')
  , visible = require('visible-element')($)

visible.inViewport($('#visible')) // → true
visible.inViewport($('#hidden')) // → false

// requires a DOM library
// the parent arg is optional, it'll default to $el.parent()
// this method is useful for parents that have `overflow: scroll`
visible.inContainer($('#visible'), $('#parent')) // → true
visible.inContainer($('#hidden'), $('#parent')) // → true
```

## Methods

### Initialization
The library must first be initialized before use.

```js
var visibleElement = require('visible-element')
  , visible = visibleElement()

visible.inViewport(document.getElementById('my-element'))
```

Or, you can initialize with a DOM library (like jQuery).

```js
var visibleElement = require('visible-element')
  , $ = require('jquery')
  , visible = visibleElement($)

visible.inViewport($('my-element'))
// you can then also use
visible.inContainer($('my-element'), $('my-scrolling-container'))
```


### `inViewport(<DOMNode || jqueryEl> el)`
Checks if the element is visible in the entire viewport. Returns a boolean. Accepts a jQuery-style wrapped DOM element or a raw element.

Does not require a DOM library.

### `inContainer(<jqueryEl> el[, <jqueryEl> parent])`
Checks if an element is visible in a container. This is especially useful if the parent has `overflow: hidden` or `overflow: scroll` on it.

Returns a boolean. Accepts an element as the first argument. An optional second argument defines the parent container. If not passed, it will default to the immediate parent of the element.

Requires initialization with a DOM library.

## Tests
Tests are [prova](https://github.com/azer/prova), based on [tape](https://github.com/substack/tape). They can be run with `npm test`.

## Developing
To publish, run `gulp publish --bump=patch`

## Changelog
### 1.0.0
Initial Release
