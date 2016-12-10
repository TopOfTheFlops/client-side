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
    currentUser: {}
  }
  freeze(initialState)
  var expected = {
    currentPage: 'newsFeed',
    lifestyles: [],
    currentUser : {}
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
    currentUser: {},
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
    currentUser: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 5}
    ]
  }
  var actual= reducer(initialState, {type: 'UP_VOTE', payload: 1})

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
    currentUser: {},
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
    currentUser: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 6}
    ]
  }
  const actual = reducer(initialState, {type: 'DOWN_VOTE', payload: 4})
  t.deepEqual(actual, expected, 'DOWN_VOTE increments vote count')
  t.end()
})

test('tests RECEIVE_LIFESTYLES gets lifestyle data', function(t) {
  var initialState = {
    currentPage: 'login',
    requestingLifestyles: true,
    lifestyles: [],
    currentUser: {},
    flops: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    requestingLifestyles: false,
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ],
    currentUser: {},
    flops: []
  }

  const actual = reducer(initialState, {type: 'RECEIVE_LIFESTYLES', payload: [
    {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
    {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
  ],})
  t.deepEqual(actual, expected, 'receive lifestyles works')
  t.end()
})

test('tests RECEIVE_FLOPS gets flops data', function(t) {
  var initialState = {
    currentPage: 'login',
    requestingFlops: true,
    lifestyles: [],
    currentUser: {},
    flops: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [],
    requestingFlops: false,
    currentUser: {},
    flops: [
      {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
      {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
      {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
      {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 6}
    ]
  }

  const actual = reducer(initialState, {type: 'RECEIVE_FLOPS', payload: [
    {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
    {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
    {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
    {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 6}
  ]})
  t.deepEqual(actual, expected, 'receive flops works')
  t.end()
})


test('tests RECEIVE_CURRENT_USER gets current flopper data', function(t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {},
    flops: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {
      userId: 1,
      name: 'lord master',
      profilePic: 'imgur.com/flj2530',
      bio: 'Im good at things!',
      lifestylesFollowing: ['lasagna', 'cup stacking'],
      floppersFollowing: [1,3,4]
    },
    flops: []
  }

  const actual = reducer(initialState, {type: 'RECEIVE_CURRENT_USER', payload: {
    userId: 1,
    name: 'lord master',
    profilePic: 'imgur.com/flj2530',
    bio: 'Im good at things!',
    lifestylesFollowing: ['lasagna', 'cup stacking'],
    floppersFollowing: [1,3,4]
    }})
  t.deepEqual(actual, expected, 'receive currentUser works')
  t.end()
})

test('tests CHANGE_CURRENTLIFESTYLEID can change the id', function (t) {
  const initialState = {
    currentPage: '/',
    currentLifestyleId: 1
  }

  freeze(initialState)

  const expected = {
    currentPage: '/',
    currentLifestyleId: 2
  }

  const actual = reducer(initialState, {type: 'CHANGE_CURRENTLIFESTYLEID', payload: 2})

  t.deepEqual(actual,expected, 'changing the currentLifestyleId')
  t.end()
})

test('LOGIN_INIT', function(t){

  var initialState = {
    loginInProgress: false
  }
  // arrange
  const expectedLoginInProgress = true
  freeze(initialState)
  const action = {type: 'LOGIN_INIT'}
  // act
  const newState = reducer(initialState, action)
  // assert
  t.equal(newState.loginInProgress, expectedLoginInProgress, "login init changes logininprogr 1`ess to true")
  t.end()
})

test('LOGIN_SUCCESSFUL', function(t){
  var initialState = {
    loginInProgress: true,
    loginUnsuccessful: true
  }
  // arrange
  const expectedLoginInProgress = false
  const expectedLoginUnsuccessful = false
  freeze(initialState)
  const userData = {
      userId: 1,
      name: 'lord master',
      profilePic: 'http://abdindia.com/wp-content/uploads/2014/01/lord.jpg',
      bio: 'Im good at things!'
    }
  const action = {type: 'LOGIN_SUCCESSFUL', payload: userData}
  // act
  const newState = reducer(initialState, action)
  // assert
  t.equal(newState.loginInProgress, expectedLoginInProgress, "Login succesful changes state to loginInProgress to false")
  t.equal(newState.loginUnsuccessful, expectedLoginUnsuccessful, "Login succesful changes state to loginUnsuccessful to true")
  t.deepEqual(newState.currentUser, userData, "Login successful adds the user data from payload to current user")
  t.end()
})

test('LOGIN_UNSUCCESSFUL', function(t){
  var initialState = {
    loginInProgress: true,
    loginUnsuccessful: false
  }
  // arrange
  const expectedLoginInProgress = false
  const expectedLoginUnsuccessful = true
  freeze(initialState)
  const action = {type: 'LOGIN_UNSUCCESSFUL'}
  // act
  const newState = reducer(initialState, action)
  // assert
  t.equal(newState.loginInProgress, expectedLoginInProgress, "Login unsuccesful changes state to loginInProgress to false")
  t.equal(newState.loginUnsuccessful, expectedLoginUnsuccessful, "Login unsuccesful changes state to loginUnsuccessful to false")
  t.end()
})
