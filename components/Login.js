import React from 'react'
import getLifestyles from '../api/getLifestyles'
import getFlops from '../api/getFlops'
import getCurrentUser from '../api/getCurrentUser'

function Login({state, dispatch}) {
  function login (e) {
    e.preventDefault()
    getCurrentUser(dispatch, 2)
    getLifestyles(dispatch)
    getFlops(dispatch)
    dispatch({type: 'CHANGE_PAGE', payload: '/dashboard'})
  }
  function goToSignup () {
    dispatch({type: 'CHANGE_PAGE', payload: '/signup'})
  }
  return (
    <div className='loginPage'>
      <h1 className='loginTitle'>top of the flops</h1>
      <form className='loginForm'>
        <input className='username' placeholder='username' type='text'/>
        <input className='password' placeholder='password' type='password'/>
        <input className='loginButton' type='submit' value='Login!' onClick={login}></input>
      </form>
      <button className='signupButton' onClick={goToSignup}>Sign Up!</button>
    </div>
  )
}

export default Login
