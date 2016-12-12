
module.exports = (state, action) => {
  const newState = require('clone')(state)
  const {type, payload} = action
  switch(type) {
    case 'LOGIN_INIT':
      newState.loginInProgress = true
      newState.flops = attachVotes(newState.votes, newState.flops)
      return newState
    case 'LOGIN_SUCCESSFUL':
      newState.loginInProgress = false
      newState.loginUnsuccessful = false
      newState.currentUser = payload
      newState.flops = attachVotes(newState.votes, newState.flops)
      return newState
    case 'LOGIN_UNSUCCESSFUL':
      newState.loginInProgress = false
      newState.loginUnsuccessful = true
      return newState
    case 'CHANGE_PAGE':
      newState.currentPage = payload
      return newState
    case 'POST_VOTE':
      newState.flops = attachVotes(newState.votes, newState.flops)
      var voteFound = false
      var voteIndex = 0
      newState.votes.forEach((vote, index)=> {
        if(vote.flopId === payload.flopId && vote.userId === payload.userId){
          console.log('Vote found, overwriting');
          voteFound = true
          voteIndex = index
        }
      })
      if (voteFound) {
        newState.votes[voteIndex] = payload
      }
      else {
        newState.votes.push(payload)
      }
      newState.flops = attachVotes(newState.votes, newState.flops)
      return newState

    case 'RECEIVE_VOTES':
      newState.votes = payload
      newState.flops = attachVotes(newState.votes, newState.flops)
      return newState
    case 'REQUEST_LIFESTYLES':
      newState.requestingLifestyles = true
      newState.flops = attachVotes(newState.votes, newState.flops)
      return newState
    case 'RECEIVE_LIFESTYLES':
      newState.requestingLifestyles = false
      newState.lifestyles = payload
      newState.flops = attachVotes(newState.votes, newState.flops)
      return newState
    case 'REQUEST_FLOPS':
      newState.requestingFlops = true
      return newState
    case 'RECEIVE_FLOPS':
      newState.requestingFlops = false
      newState.flops = payload
      newState.flops = attachVotes(newState.votes, newState.flops)
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

function attachVotes(votes, flops) {
  console.log('attaching votes');
   return flops.map(flop => {
    flop.upvotes = 0
    flop.downvotes = 0
    votes
      .filter(vote => vote.flopId == flop.flopId)
      .forEach(vote => {
        flop.upvotes += Number(vote.upvote)
        flop.downvotes += Number(vote.downvote)
      })
    return flop
  })
}
