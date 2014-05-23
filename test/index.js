var test = require('prova')
  , $ = require('jquery')
  , $body = $('body')
  , viewable = require('../')($)

test('inViewport', function(t){
  var $el = $body.append('<div id="up-high" />').find('#up-high')
  , spacer = $body.append('<div id="spacer" />').find('#spacer')
  , $bottomEl = $body.append('<div id="bottom" />').find('#bottom')

  // the test will likely be run from an iframe
  spacer.height((window.innerHeight || parent.window.innerHeight) * 2)
  spacer.width(1)

  t.plan(4)

  t.equal(
    viewable.inViewport($el[0])
    , true
    , 'works for visible els'
  )

  t.equal(
    viewable.inViewport($el)
    , true
    , 'works for visible jquery els'
  )

  t.equal(
    viewable.inViewport($bottomEl[0])
    , false
    , 'works for not visible els'
  )

  t.equal(
    viewable.inViewport($bottomEl)
    , false
    , 'works for not visible jquery els'
  )

  $body.empty()
})

test('inContainer', function(t){
  var $parent = $body.append('<div id="parent" style="overflow: hidden; height: 200px" />').find('#parent')
    , $visible = $parent.append('<div id="visible" style="height: 200px" />').find('#visible')
    , $invisible = $parent.append('<div id="invisible" style="height: 200px" />').find('#invisible')

  t.plan(4)

  t.equal(
    viewable.inContainer($visible)
    , true
    , 'works for visible jquery els'
  )

  t.equal(
    viewable.inContainer($invisible)
    , false
    , 'works for not visible jquery els'
  )

  t.equal(
    viewable.inContainer($invisible, $parent)
    , false
    , 'works for not visible jquery els with a defined parent'
  )

  t.equal(
    viewable.inContainer($visible, $parent)
    , true
    , 'works for visible jquery els with a defined parent'
  )
})
