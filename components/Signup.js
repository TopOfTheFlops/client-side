import React from 'react'
import createNewUser from '../api/createNewUser'
import callCloudinary from '../widget'

function Signup({state, dispatch}) {
  function signupNewUser (e) {
    e.preventDefault()
    console.log('Username:',e.target.value)
    var userInfo ={
      username : document.getElementById('username').value,
      name : document.getElementById('name').value,
      password : document.getElementById('password').value,
      bio : document.getElementById('bio').value,
      profilePic : state.currentPhotoURLs
    }
    createNewUser(dispatch, userInfo)
  }
  return(
    <div className='loginPage'>
      <h1 className='loginTitle'>top of the flops</h1>
      <form action='' method='post'>
        <input className='username' placeholder='username' type='text' name='username' id='username'/>
        <input className='username' placeholder='name' type='text' name='name' id='name'/>
        <input className='password' placeholder='password' type='password' name='password'id='password'/>
        <button id="upload_widget_opener" onClick={ (e) => {
            e.preventDefault()
            callCloudinary(dispatch)
          }
        }>Add a profile picture</button>
        <input className='username' placeholder='a bit about you...' type='text' name='bio' id='bio'/>
        <input className='loginButton' type='submit' value='signup!' onClick={signupNewUser}/>
      </form>
    </div>
  )
}

module.exports = Signup
