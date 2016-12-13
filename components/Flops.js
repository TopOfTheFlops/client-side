import React from 'react'

import Header from './Header'
import Nav from './Nav'
import voteFlop from '../api/voteFlop'

function Flops ({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/flops/new'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      <button className='create' onClick={goToCreateFlop}>Compete!</button>
      {RenderFlops(state, dispatch)}
      <div className='clear' />
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

function RenderFlops (state, dispatch) {
  return state.flops
    .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
    .filter(flop => {
      return flop.lifestyleId == state.currentLifestyleId
    })
    .map((flop, index) => {
      flop.rank = index + 1
      var userPic = state.allUsers.find(user => user.userId === flop.userId).profilePic
      return (
        <div className='flop' key={flop.flopId}>
          <img className='flopPic clickable' src={flop.mediaURL} onClick={() => {
            dispatch({type: 'CHANGE_VIEW_SINGLE_FLOP', payload: flop.flopId})
            dispatch({type: 'CHANGE_PAGE', payload: `/flops/${flop.flopId}`})
          }} />
          <div className="user">
            <div><img className="userThumbnail" src={userPic}/></div>
            <p className="clickable usernameLink" onClick={() => {
              dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
              dispatch({type: 'CHANGE_PAGE', payload: '/profile'})
            }}>{flop.username}</p>
          </div>
          <p>{flop.description}</p>
          <button className='upvote clickable' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</button>
          <button className='downvote clickable' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</button>
        </div>
      )
    })
}

// <div className={customClass+" user"} key={index}>
//   <div>
//   <img className="userThumbnail" src={userPic}/>
//   </div>
//   <p className="clickable usernameLink" onClick={() =>{
//     dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
//     dispatch({type: 'CHANGE_PAGE', payload: '/profile'})
//   }}>{flop.rank}. {flop.username}</p>
// </div>

function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 className='lifestyleHeader' key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

module.exports = Flops
