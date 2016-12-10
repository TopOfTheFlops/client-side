import request from 'superagent'

module.exports = (dispatch, flopInfo) => {
  console.log(flopInfo);
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/flops')
    .send(flopInfo)
    .end((err, res) => {
      if (err) return console.log(err)
      console.log(res.body.error);
      if (res.body.error) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      else dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
    })
}
