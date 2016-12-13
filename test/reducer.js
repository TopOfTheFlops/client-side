var test = require('tape')
var reducer = require('../reducer')
var freeze = require('deep-freeze')

test('base test', function (t) {
  t.ok(true)
  t.end()
})

test('tests CHANGE_PAGE case', function (t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {}
  }
  freeze(initialState)
  var expected = {
    currentPage: 'newsFeed',
    lifestyles: [],
    currentUser: {}
  }
  var actual = reducer(initialState, {type: 'CHANGE_PAGE', payload: 'newsFeed'})
  t.deepEqual(actual, expected, 'CHANGE_PAGE changes page correctly')
  t.end()
})

test('tests POST_VOTE can add a vote to the state ', function (t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ],
    currentUser: {},
    flops: [],
    votes: [{'voteId': 1, 'flopId': 1, 'userId': 1, 'upvote': 0, 'downvote': 1}]
  }

  freeze(initialState)
  var expected = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ],
    currentUser: {},
    flops: [],
    votes: [
      {'voteId': 1, 'flopId': 1, 'userId': 1, 'upvote': 0, 'downvote': 1},
      {'voteId': 3, 'flopId': 13, 'userId': 32, 'upvote': 1, 'downvote': 0}
    ]
  }
  var actual = reducer(initialState, {type: 'POST_VOTE', payload:
    {'voteId': 3, 'flopId': 13, 'userId': 32, 'upvote': 1, 'downvote': 0}})

  t.deepEqual(actual, expected, 'POST_VOTE posts a single vote correctly')
  t.end()
})

test('tests POST_VOTE only updates vote when it is already present ', function (t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ],
    currentUser: {},
    flops: [],
    votes: [{'flopId': 1, 'userId': 1, 'upvote': 0, 'downvote': 1}]
  }

  freeze(initialState)
  var expected = {
    currentPage: 'login',
    lifestyles: [
      {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
      {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ],
    currentUser: {},
    flops: [],
    votes: [
      {'flopId': 1, 'userId': 1, 'upvote': 1, 'downvote': 0}
    ]
  }
  var actual = reducer(initialState, {type: 'POST_VOTE', payload:
    {'flopId': 1, 'userId': 1, 'upvote': 1, 'downvote': 0}})

  t.deepEqual(actual, expected, 'POST_VOTE updates a vote correctly')
  t.end()
})

test('tests RECEIVE_LIFESTYLES gets lifestyle data', function (t) {
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
  ] })
  t.deepEqual(actual, expected, 'receive lifestyles works')
  t.end()
})

test('tests RECEIVE_FLOPS gets flops data', function (t) {
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

test('tests RECEIVE_CURRENT_USER gets current flopper data', function (t) {
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
      floppersFollowing: [1, 3, 4]
    },
    flops: []
  }

  const actual = reducer(initialState, {type: 'RECEIVE_CURRENT_USER', payload: {
    userId: 1,
    name: 'lord master',
    profilePic: 'imgur.com/flj2530',
    bio: 'Im good at things!',
    lifestylesFollowing: ['lasagna', 'cup stacking'],
    floppersFollowing: [1, 3, 4]
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

  t.deepEqual(actual, expected, 'changing the currentLifestyleId')
  t.end()
})

test('LOGIN_INIT', function (t) {
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
  t.equal(newState.loginInProgress, expectedLoginInProgress, 'login init changes logininprogr 1`ess to true')
  t.end()
})

test('LOGIN_SUCCESSFUL', function (t) {
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
  t.equal(newState.loginInProgress, expectedLoginInProgress, 'Login succesful changes state to loginInProgress to false')
  t.equal(newState.loginUnsuccessful, expectedLoginUnsuccessful, 'Login succesful changes state to loginUnsuccessful to true')
  t.deepEqual(newState.currentUser, userData, 'Login successful adds the user data from payload to current user')
  t.end()
})

test('LOGIN_UNSUCCESSFUL', function (t) {
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
  t.equal(newState.loginInProgress, expectedLoginInProgress, 'Login unsuccesful changes state to loginInProgress to false')
  t.equal(newState.loginUnsuccessful, expectedLoginUnsuccessful, 'Login unsuccesful changes state to loginUnsuccessful to false')
  t.end()
})

test('SAVE_PHOTO_URL', function (t) {
  var initialState = {
    currentPhotoURLs: null
  }
  // arrange
  var expectedState = {
    currentPhotoURLs: 'url'
  }
  freeze(initialState)
  const action = {type: 'SAVE_PHOTO_URL', payload: 'url' }
  // act
  const newState = reducer(initialState, action)
  // assert
  t.equal(newState.currentPhotoURLs, expectedState.currentPhotoURLs, 'Save photo urls changes the property to payload urls')
  t.end()
})

test('REMOVE_PHOTO_URL', function (t) {
  var initialState = {
    currentPhotoURLs: 'url'
  }
  // arrange
  const expectedState = {
    currentPhotoURLs: null
  }
  freeze(initialState)
  const action = {type: 'REMOVE_PHOTO_URL'}
  // act
  const newState = reducer(initialState, action)
  // assert
  t.equal(newState.currentPhotoURLs, expectedState.currentPhotoURLs, 'Remove photo url changes currentPhotoURLs to null')
  t.end()
})

test('LOGOUT', function (t) {
  var initialState = {
    currentUser: {
      userId: 1,
      name: 'lord master',
      profilePic: 'http://abdindia.com/wp-content/uploads/2014/01/lord.jpg',
      bio: 'Im good at things!'
    }
  }
  // arrange
  const expectedCurrentUser = null
  freeze(initialState)
  const action = {type: 'LOGOUT'}
  // act
  const newState = reducer(initialState, action)
  // assert
  t.deepEqual(newState.currentUser, expectedCurrentUser, 'Logout successfully removes currentUser data from the state')
  t.end()
})

test('tests RECEIVE_VOTES gets all the votes', function (t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {},
    flops: [],
    votes: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {},
    flops: [],
    votes: [
      {'voteId': 1, 'flopId': 1, 'userId': 1, 'upvote': 0, 'downvote': 1},
      {'voteId': 2, 'flopId': 20, 'userId': 1, 'upvote': 0, 'downvote': 1},
      {'voteId': 3, 'flopId': 13, 'userId': 1, 'upvote': 1, 'downvote': 0}
    ]
  }

  const actual = reducer(initialState, {type: 'RECEIVE_VOTES', payload: [
    {'voteId': 1, 'flopId': 1, 'userId': 1, 'upvote': 0, 'downvote': 1},
    {'voteId': 2, 'flopId': 20, 'userId': 1, 'upvote': 0, 'downvote': 1},
    {'voteId': 3, 'flopId': 13, 'userId': 1, 'upvote': 1, 'downvote': 0}
  ]})
  t.deepEqual(actual, expected, 'receive votes works really very well')
  t.end()
})

test('tests RECEIVE_ALL_USERS can receive all users correctly', function (t) {
  var initialState = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {},
    flops: [],
    votes: [],
    allUsers: []
  }
  freeze(initialState)

  var expected = {
    currentPage: 'login',
    lifestyles: [],
    currentUser: {},
    flops: [],
    votes: [],
    allUsers: [
      {userId: 1, name: 'lord master', profilePic: 'imgur.com/flj2530', bio: 'Im good at things!'},
      {userId: 1, name: 'lord man', profilePic: 'imgur.com/flj2530', bio: 'Im good at things!'},
      {userId: 2, name: 'lord yo', profilePic: 'imgur.com/flj2530', bio: 'Im good at things!'}
    ]
  }

  const actual = reducer(initialState, {type: 'RECEIVE_ALL_USERS', payload: [
    {userId: 1, name: 'lord master', profilePic: 'imgur.com/flj2530', bio: 'Im good at things!'},
    {userId: 1, name: 'lord man', profilePic: 'imgur.com/flj2530', bio: 'Im good at things!'},
    {userId: 2, name: 'lord yo', profilePic: 'imgur.com/flj2530', bio: 'Im good at things!'}
  ]})
  t.deepEqual(actual, expected, 'receive allUsers works well')
  t.end()
})
