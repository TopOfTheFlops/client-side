
module.exports = (state, action) => {
  const newState = require('clone')(state)
  const {type, payload} = action
  switch(type) {
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
    case 'UP_VOTE':
      newState.flops.find(flop => flop.flopId == payload).upvotes++
      return newState
    case 'DOWN_VOTE':
      newState.flops.find(flop => flop.flopId == payload).downvotes++
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
    case 'CHANGE_CURRENTLIFESTYLEID':
      newState.currentLifestyleId = payload
      return newState
    case 'CHANGE_VIEW_SINGLE_FLOP':
      newState.viewSingleFlop = payload
      return newState
    case 'SAVE_PHOTO_URL':
      newState.currentPhotoURLs = payload
      return newState
    case 'REMOVE_PHOTO_URL':
      newState.currentPhotoURLs = null
      return newState
    case 'LOGOUT':
      newState.currentUser = null
      return newState
    default:
      return newState
  }
}
