var test = require('tape')
var reducer = require('../reducer')
var freeze = require('deep-freeze')

test('base test', function (t) {
  t.ok(true)
  t.end()
})

test('tests CHANGE_PAGE case', function(t) {
  var initialState = {
    currentPage: 'login',
    lifeStyles: [],
    currentFlopper: {}
  }
  freeze(initialState)
  var expectedState = {
    currentPage: 'newsFeed',
    lifeStyles: [],
    currentFlopper : {}
  }
  var actual = reducer(initialState, {type: 'CHANGE_PAGE', payload: 'newsFeed'})
  t.deepEqual(actual, expectedState, 'CHANGE_PAGE changes page correctly')
  t.end()
})
