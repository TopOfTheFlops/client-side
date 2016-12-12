import React from 'react'
import Header from './Header'
import Nav from './Nav'
import logout from '../api/logout'

function Profile({state, dispatch}) {
  return (
    <div>
      <Header />
      <button className='create' onClick={() => dispatch({type: 'CHANGE_PAGE', payload: '/editprofile'})}>Edit Profile</button>
      <button className='create' onClick={() => logout(dispatch)}>Logout</button>
      <h3>Your Profile</h3>
      <div className="profile">
      <img className='profilePic' src={state.currentUser.profilePic}/>
        <div className="profileInfo">
          <h2 >{state.currentUser.name}</h2>
          <p>{state.currentUser.bio}</p>
        </div>
      </div>
      {SortFlops(state, dispatch)}
      <div className='clear'></div>
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

function SortFlops(state, dispatch) {
  const {flops, lifestyles} = state
  return lifestyles
    .map(lifestyle => {
        return flops
      .filter( flop => flop.lifestyleId === lifestyle.lifestyleId)
      .sort((a,b) => b.upvotes - a.upvotes)
      .map((flop, index) => {
        flop.rank = index+1
        if (flop.username === state.currentUser.username)
        return (
          <div>
            {getTitle(flop, lifestyle)}
            <h2>#{flop.rank}</h2>
          </div>
        )
    })
  })
}

function getTitle (flop, lifestyle){
  flop.lifestyleId == lifestyle.lifestyleId
  return <h2>{lifestyle.title}</h2>
}

module.exports = Profile
