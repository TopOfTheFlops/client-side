
module.exports = (state, action) => {
  const newState = require('clone')(state)
  switch(action.type) {
    case 'CHANGE_PAGE':
      newState.currentPage = action.payload
      return newState
    default:
      return newState
  }
}
