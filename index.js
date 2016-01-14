'use strict';

var $

/* via https://stackoverflow.com/questions/123999/
  how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
*/

function inViewport(el){
  var height = (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */
    , width = (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    , rect

  // special bonus for those using jQuery
  if ($ && el instanceof $) el = el[0]

  rect = el.getBoundingClientRect()

  return (
      rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= height
      && rect.right <= width
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
