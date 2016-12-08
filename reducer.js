var getLifestyles = require('./test/apiCalls').getLifestyles
var getFlops = require('./test/apiCalls').getFlops
var getCurrentFlopper = require('./test/apiCalls').getCurrentFlopper


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
      newState.lifeStyles = getLifestyles()
      return newState
    case 'RECEIVE_FLOPS':
      newState.flops = getFlops()
      return newState
    case 'RECEIVE_CURRENTFLOPPER':
      newState.currentFlopper = getCurrentFlopper()
      return newState
    default:
      return newState
  }
}




// recieve lifeStyles
// recieve flops
// recieve currentFlopper
