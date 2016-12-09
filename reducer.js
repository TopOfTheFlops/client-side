
module.exports = (state, action) => {
  const newState = require('clone')(state)
  const {type, payload} = action
  switch(type) {
    case 'CHANGE_PAGE':
      newState.currentPage = payload
      return newState
    case 'UP_VOTE':
    var {lifestyleId, flopId} = payload
      newState.flops.forEach((flop, index) => {
        if(flop.lifestyleId === lifestyleId && flop.flopId === flopId) newState.flops[index].upvotes ++
      })
      return newState
    case 'DOWN_VOTE':
    var {lifestyleId, flopId} = payload
      newState.flops.forEach((flop, index) => {
        if(flop.lifestyleId === lifestyleId && flop.flopId === flopId) newState.flops[index].downvotes ++
      })
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
