import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, flopId, userId, upvote, downvote) => {

  const sendInfo = {
    flopId,
    userId,
    upvote,
    downvote
  }

  request
    .post(`${url}/api/v1/votes`)
    .withCredentials()
    .send(sendInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      } else if (state.votes.find(vote => vote.flopId == flopId && vote.userId == userId)) {
        dispatch({type: 'UP_VOTE', payload})
      }
      console.log(res);
      dispatch({type:'DOWN_VOTE', payload: flopId})
    })
}
