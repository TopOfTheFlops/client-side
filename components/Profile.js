import React from 'react'
import Header from './Header'
import Nav from './Nav'
import logout from '../api/logout'

function Profile ({state, dispatch}) {
  function goBack (e) {
    e.preventDefault()
    window.history.back()
    // dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
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

function User (state, dispatch) {
  return state.allUsers
    .filter(user => {
      return user.userId == state.currentViewUserId
    })
    .map(user => {
      return (
        <div key={user.userId}>
          <h1>{user.username}</h1>
          <img className="profilePic" src={user.profilePic}/>
        </div>
      )
    })
}

function SortFlops (state, dispatch, userId) {
  const {flops, lifestyles} = state
  return lifestyles
    .map(lifestyle => {
      return flops
      .filter(flop => flop.lifestyleId === lifestyle.lifestyleId)
      .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
      .map((flop, index) => {
        flop.rank = index + 1
        if (flop.userId === userId) {
          return (
            <div className='flopContainer' key={flop.flopId}>
            <div className='flopRank'>
              <h2>{flop.rank}</h2>
            </div>
            {getTitle(flop, lifestyle)}
            </div>
          )
        }
      })
    })
}

function getTitle (flop, lifestyle) {
  return <h2 className='lifestyleTitle'>{lifestyle.title}</h2>
}

module.exports = Profile
