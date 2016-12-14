import React from 'react'
import editUserProfile from '../api/editUserProfile'
import callCloudinary from '../widget'
import Header from './Header'
import Nav from './Nav'


function EditProfile({state, dispatch}) {
  function editProfile (e) {
    e.preventDefault()
    var userInfo = {
      password: document.getElementById('password').value,
      bio: document.getElementById('bio').value,
      location: document.getElementById('location').value,
      profilePic: state.currentPhotoURLs
    }
    editUserProfile(dispatch, userInfo, state)
  }

  function goBack (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: `/profile/${state.currentUser.username}`})
  }

  return (
    <div className=''>
      <Header />
      <div className="buttonGroup dashboardButtons">
        <button className='btn clickable' onClick={goBack}>back</button>
      </div>
      <div className='form-content'>
        <form action='' method='post'>
          <input className='password' placeholder='Change password' type='password' name='password'id='password' />
          <input className='username' placeholder='Change location' type='text' name='location' id='location' />
          <input className='username' placeholder='Change Bio' type='text' name='bio' id='bio' />
          <p>Change Profile Picture</p>
          <div className='btn upload_widget_opener' onClick={(e) => {
            e.preventDefault()
            callCloudinary(dispatch)
          }
        }><p>+</p></div>
          <input className='loginButton' type='submit' value='Submit!' onClick={editProfile}/>
        </form>
      </div>  
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

module.exports = EditProfile
