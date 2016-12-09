
module.exports = (state, action) => {
  const newState = require('clone')(state)
  const {type, payload} = action
  switch(type) {
    case 'CHANGE_PAGE':
      newState.currentPage = payload
      return newState
    case 'UP_VOTE':
      newState.flops.find(flop => flop.flopId == payload).upvotes++
      return newState
    case 'DOWN_VOTE':
    var correctFlop = newState.flops.find(flop => flop.flopId == payload)
    correctFlop.downvotes ++
    return newState
    case 'RECEIVE_LIFESTYLES':
      newState.lifestyles = payload
      return newState
    case 'RECEIVE_FLOPS':
      newState.flops = payload
      return newState
    case 'RECEIVE_CURRENT_USER':
      newState.currentUser = payload
      return newState
    case 'CHANGE_CURRENTLIFESTYLEID':
      newState.currentLifestyleId = payload
      return newState
    default:
      return newState
  }
}
