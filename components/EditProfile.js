import React from 'react'
import createNewUser from '../api/createNewUser'
import callCloudinary from '../widget'
import Header from './Header'
import Nav from './Nav'

function EditProfile({state, dispatch}) {
  function editUserProfile (e) {
    e.preventDefault()
    console.log('Username:',e.target.value)
    var userInfo = {
      password : document.getElementById('password').value,
      bio : document.getElementById('bio').value,
      location: document.getElementById('location').value,
      profilePic : state.currentPhotoURLs
    }
    createNewUser(dispatch, userInfo)
  }
  return(
    <div className=''>
      <Header/>
      <h1 className='loginTitle'>top of the flops</h1>
      <form action='' method='post'>
        <input className='password' placeholder='Change password' type='password' name='password'id='password'/>
        <input className='username' placeholder='Change location' type='text' name='location' id='location'/>
        <input className='username' placeholder='Change Bio' type='text' name='bio' id='bio'/>
        <button id="upload_widget_opener" onClick={ (e) => {
            e.preventDefault()
            callCloudinary(dispatch)
          }
        }>Change profile picture</button>
        <input className='loginButton' type='submit' value='Submit!' onClick={editUserProfile}/>
      </form>
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

module.exports = EditProfile
