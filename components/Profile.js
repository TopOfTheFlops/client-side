import React from 'react'
import Header from './Header'
import Nav from './Nav'
import logout from '../api/logout'

const { User, getTitle, SortFlops } = require('../helpers/profile')

const Profile = ({state, dispatch}) => {
  const goBack = e => {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
  }
  if(state.currentUser.userId === state.currentViewUserId) {
    return (
      <div>
        <Header />
        <div className="buttonGroup dashboardButtons">
          <div className='btn clickable' onClick={() => dispatch({type: 'CHANGE_PAGE', payload: `/profile/${state.currentUser.username}/edit`})}>Edit Profile</div>
          <div className='btn clickable' onClick={() => logout(dispatch)}>Logout</div>
        </div>
        <h3>Your Profile</h3>
        <div className='profile'>
          <h1 >{state.currentUser.name}</h1>
          <img className='profilePic' src={state.currentUser.profilePic} />
          <div className='profileInfo'>
            <p>{state.currentUser.bio}</p>
          </div>
        </div>
        {SortFlops(state, dispatch, state.currentUser.userId)}
        <div className='clear' />
        <Nav state={state} dispatch={dispatch} />
      </div>
    )
  } else {
    return (
      <div>
        <Header />
        <div className="dashboardButtons buttonGroup">
          <div className="btn clickable" onClick={goBack}>back</div>
        </div>
        <h3>User Profile</h3>
        {User(state, dispatch)}
        {SortFlops(state, dispatch, state.currentViewUserId)}
        <Nav dispatch={dispatch} state={state}/>
      </div>
    )
  }

}

module.exports = Profile
