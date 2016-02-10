'use strict';

var $

/* via https://stackoverflow.com/questions/123999/
  how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
*/

function inViewport(el, pad){
  var height = (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */
    , width = (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    , rect

  if (typeof pad === 'undefined'){
    pad = 0;
  }

  if (typeof pad === 'number'){
    pad = {
      top: pad
      , left: pad
      , bottom: pad
      , right: pad
    }
  }

  // special bonus for those using jQuery
  if ($ && el instanceof $) el = el[0]

  rect = el.getBoundingClientRect()

  return (
      rect.top >= 0 + pad.top
      && rect.left >= 0 + pad.left
      && rect.bottom <= height - pad.bottom
      && rect.right <= width - pad.right
    )
}

// via https://stackoverflow.com/questions/6597904/scrollable-div-which-elements-can-be-seen
function inContainer($el, $parent){
  if (!$) throw new Error('Must have a DOM library')

  $parent || ($parent = $el.parent())

  return $el.position().top + $el.height() > 0 && $el.position().top < $parent.height()
}

// allow users to set their own DOM library (like jquery), or… not
module.exports = function viewableElement(domLib){
  $ = domLib
  return {
    inViewport: inViewport
    , inContainer: inContainer
  }
}

module.exports.$ = $
