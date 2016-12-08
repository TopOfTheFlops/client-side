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
    lifestyles: [],
    currentFlopper: {}
  }
  freeze(initialState)
  var expected = {
    currentPage: 'newsFeed',
    lifestyles: [],
    currentFlopper : {}
  }
  var actual = reducer(initialState, {type: 'CHANGE_PAGE', payload: 'newsFeed'})
  t.deepEqual(actual, expected, 'CHANGE_PAGE changes page correctly')
  t.end()
})

test('tests UP_VOTE can increment the upvote count', function(t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2},
    ],
    currentFlopper: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 6, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 5}
    ]
  }

  freeze(initialState)
  var expected = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2},
    ],
    currentFlopper: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 5}
    ]
  }
  var actual= reducer(initialState, {type: 'UP_VOTE', payload: {lifestyleId: 1, flopId: 1}})

  t.deepEqual(actual, expected, 'UP_VOTE increments vote count')
  t.end()
})


test('tests DOWN_VOTE can decrement the downvote count', function(t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2},
    ],
    currentFlopper: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 5}
    ]
  }

  freeze(initialState)
  var expected = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2},
    ],
    currentFlopper: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 6}
    ]
  }
  const actual = reducer(initialState, {type: 'DOWN_VOTE', payload: {lifestyleId: 1, flopId: 4}})
  t.deepEqual(actual, expected, 'DOWN_VOTE increments vote count')
  t.end()
})

test('tests RECEIVE_LIFESTYLES gets lifestyle data', function(t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentFlopper: {},
    flops: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ],
    currentFlopper: {},
    flops: []
  }

  const actual = reducer(initialState, {type: 'RECEIVE_LIFESTYLES'})
  t.deepEqual(actual, expected, 'receive lifestyles works')
  t.end()
})

test('tests RECEIVE_FLOPS gets flops data', function(t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentFlopper: {},
    flops: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [],
    currentFlopper: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 6}
    ]
  }

  const actual = reducer(initialState, {type: 'RECEIVE_FLOPS'})
  t.deepEqual(actual, expected, 'receive flops works')
  t.end()
})


test('tests RECEIVE_CURRENTFLOPPER gets current flopper data', function(t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentFlopper: {},
    flops: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [],
    currentFlopper: {
      flopperId: 1,
      name: 'lord master',
      profilePic: 'imgur.com/flj2530',
      bio: 'Im good at things!',
      lifestylesFollowing: ['lasagna', 'cup stacking'],
      floppersFollowing: [1,3,4]
    },
    flops: []
  }

  const actual = reducer(initialState, {type: 'RECEIVE_CURRENTFLOPPER'})
  t.deepEqual(actual, expected, 'receive currentFlopper works')
  t.end()
})
