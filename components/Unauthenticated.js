import React from 'react'
import Header from './Header'

const Unauthenticated = ({state, dispatch}) => {
  return (
    <div>
      <Header />
      <p>Error: 401, You are not authorised to see this page</p>
      <input className='loginButton' type='submit' value='Login!' onClick={() => dispatch({type: 'CHANGE_PAGE', payload: '/'})} />
      <button className='signupButton' onClick={() => dispatch({type: 'CHANGE_PAGE', payload: '/signup'})}>Sign Up!</button>
    </div>
  )
}

module.exports = Unauthenticated
