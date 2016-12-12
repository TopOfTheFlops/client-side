import React from 'react'
import loginService from '../api/loginService'
import Loader from 'halogen/PulseLoader'

function Login({state, dispatch}) {

  function login (e) {

    e.preventDefault()

    const userInfo = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }
    loginService(dispatch, userInfo)
  }

  function goToSignup () {
    dispatch({type: 'CHANGE_PAGE', payload: '/signup'})
  }

  const customClass = state.loginInProgress ? '' : 'hidden'

  const successClass = state.loginUnsuccessful ? 'show' : 'hidden'

  return (
    <div className='loginPage'>
      <h1 className='loginTitle'>top of the flops</h1>
      <form className='loginForm'>
        <input className='username' placeholder='username' type='text' id='username'/>
        <input className='password' placeholder='password' type='password' id='password'/>
        <input className='loginButton' type='submit' value='Login!' onClick={login}></input>
        <Loader className={customClass + ' loadingPulse'}/>
        <p className={successClass}>Login unsuccessful</p>
      </form>
      <button className='signupButton' onClick={goToSignup}>Sign Up!</button>
    </div>
  )
}

export default Login



// dispatch({type: 'CHANGE_PAGE', payload: '/dashboard'})
