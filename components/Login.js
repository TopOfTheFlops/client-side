import React from 'react'

function Login({state, reducer}) {

  return (
    <div className='loginPage'>
      <h1 className='loginTitle'>top of the flops</h1>
        <input className='username' placeholder='username' type='text'/>
        <input className='password' placeholder='password' type='text'/>
        <button>Login!</button>

      <button>Sign Up!</button>
    </div>
  )
}

export default Login
