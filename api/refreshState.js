import getLifestyles from './getLifestyles'
import getFlops from './getFlops'
import getVotes from './getVotes'
import getAllUsers from './getAllUsers'

module.exports = (dispatch) => {
  getVotes(dispatch)
  getLifestyles(dispatch)
  getFlops(dispatch)
  getAllUsers(dispatch)
  dispatch({type: 'CHANGE_PAGE', payload: '/lifestyles'})
}
