import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, flopId) => {
  console.log(flopId)
  request
    .get(`${url}/api/v1/flops/remove/${flopId}`)
    .withCredentials()
    .end((err, res) => {
      if (err) return console.log(err)
      getFlops(dispatch)
      getVotes(dispatch)
    })
}
