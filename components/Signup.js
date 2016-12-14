import React from 'react'
import createNewUser from '../api/createNewUser'
import callCloudinary from '../widget'

function Signup ({state, dispatch}) {
  function signupNewUser (e) {
    e.preventDefault()
    var userInfo = {
      username: document.getElementById('username').value,
      name: document.getElementById('name').value,
      password: document.getElementById('password').value,
      bio: document.getElementById('bio').value,
      location: document.getElementById('location').value,
      profilePic: state.currentPhotoURLs
    }
    createNewUser(dispatch, userInfo)
  }
  return (
    <div className='signupPage'>
      <h1 className='loginTitle signupTitle'>top of the flops</h1>
      <div className='loginPage'>
        <form action='' method='post'>
          <input className='username' placeholder='username' type='text' name='username' id='username' />
          <input className='username' placeholder='name' type='text' name='name' id='name' />
          <input className='password' placeholder='password' type='password' name='password'id='password' />
          <input className='username' placeholder='location' type='text' name='location' id='location' />
          <input className='username' placeholder='a bit about you...' type='text' name='bio' id='bio' />
          <p className='signupText'>Add a picture</p>
          <div className='btn upload_widget_opener' onClick={(e) => {
            e.preventDefault()
            callCloudinary(dispatch)
          }
        }><p>+</p></div>
          <input className='loginButton' type='submit' value='signup!' onClick={signupNewUser} />
        </form>
      </div>
    </div>
  )
}

module.exports = Signup
