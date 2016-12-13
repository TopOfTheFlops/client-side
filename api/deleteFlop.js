import request from 'superagent'
import url from './apiUrl'
import getFlops from './getFlops'
import getVotes from './getVotes'

module.exports = (dispatch, flopId) => {
  console.log(flopId)
  request
    .post(`${url}/api/v1/flops/remove/${flopId}`)
    .withCredentials()
    .end((err, res) => {
      if (err) return console.log(err)
      getFlops(dispatch)
      getVotes(dispatch)
    })
}
