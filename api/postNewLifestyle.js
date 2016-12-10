import request from 'superagent'

module.exports = (dispatch, lifestyleInfo) => {
  console.log(lifestyleInfo);
  request
    .post('https://topoftheflops.herokuapp.com/api/v1/lifestyles')
    .send(lifestyleInfo)
    .end((err, res) => {
      if (err) {
        console.log('hello', err)
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
      // console.log('hello', res.body);
      else dispatch({type: 'RECEIVE_LIFESTYLES', payload: '/dashboard'})
    })
}
