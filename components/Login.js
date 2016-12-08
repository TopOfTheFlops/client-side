import React from 'react'

function Login({state}) {
  return (
    <div>
      <h1>top of the flops</h1>
      <form>
        <input placeholder='username' type='text'/>
        <input placeholder='password' type='text'/>
        <button>Login!</button>
      </form>
      <button>Sign Up!</button>
    </div>
  )
}

export default Login
