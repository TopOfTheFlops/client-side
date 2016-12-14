
module.exports = (state, action) => {
  const newState = require('clone')(state)
  const {type, payload} = action
  switch (type) {
    case 'LOGIN_INIT':
      newState.loginInProgress = true
      return newState
    case 'LOGIN_SUCCESSFUL':
      newState.loginInProgress = false
      newState.loginUnsuccessful = false
      newState.currentUser = payload
      return newState
    case 'LOGIN_UNSUCCESSFUL':
      newState.loginInProgress = false
      newState.loginUnsuccessful = true
      return newState
    case 'CHANGE_PAGE':
      newState.currentPage = payload
      return newState
    case 'POST_VOTE':
      let voteFound = false
      let voteIndex = 0
      newState.votes.forEach((vote, index) => {
        if (vote.flopId === payload.flopId && vote.userId === payload.userId) {
          voteFound = true
          voteIndex = index
        }
      })
      if (voteFound) {
        newState.votes[voteIndex] = payload
      } else {
        newState.votes.push(payload)
      }
      return newState

    case 'RECEIVE_VOTES':
      newState.votes = payload
      return newState
    case 'REQUEST_LIFESTYLES':
      newState.requestingLifestyles = true
      return newState
    case 'RECEIVE_LIFESTYLES':
      newState.requestingLifestyles = false
      newState.lifestyles = payload
      return newState
    case 'REQUEST_FLOPS':
      newState.requestingFlops = true
      return newState
    case 'RECEIVE_FLOPS':
      newState.requestingFlops = false
      newState.flops = payload
      return newState
    case 'RECEIVE_CURRENT_USER':
      newState.currentUser = payload
      return newState
    case 'RECEIVE_ALL_USERS':
      newState.allUsers = payload
      return newState
    case 'CHANGE_CURRENTLIFESTYLEID':
      newState.currentLifestyleId = payload
      return newState
    case 'CHANGE_VIEW_SINGLE_FLOP':
      newState.viewSingleFlopId = payload
      return newState
    case 'SAVE_PHOTO_URL':
      newState.currentPhotoURLs = payload
      return newState
    case 'REMOVE_PHOTO_URL':
      newState.currentPhotoURLs = null
      return newState
    case 'LOGOUT':
      newState.currentUser = null
      newState.currentPage = '/'
      return newState
    case 'ATTACH_VOTES':
      newState.flops = newState.flops.map(flop => {
        flop.upvotes = 0
        flop.downvotes = 0
        newState.votes
           .filter(vote => vote.flopId == flop.flopId)
           .forEach(vote => {
             flop.upvotes += Number(vote.upvote)
             flop.downvotes += Number(vote.downvote)
           })
        return flop
      })
      return newState
    case 'CHANGE_CURRENT_VIEW_USER_ID':
      newState.currentViewUserId = payload
      return newState
    default:
      return newState
  }
}
