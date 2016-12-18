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
      <div className="buttonGroup dashboardButtons">
        <div className='btn' onClick={goToCreateFlop}>Compete!</div>
      </div>
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
      var foundVote = state.votes.filter(vote => vote.flopId === flop.flopId && vote.userId === state.currentUser.userId)
      var userUpvote = foundVote.length > 0 && (Number(foundVote[0].upvote) === 1) ? "userHasVoted" : ""
      var userDownvote = foundVote.length > 0 && (Number(foundVote[0].downvote) === 1) ? "userHasVoted" : ""
      return (
        <div className='flop' key={flop.flopId}>
          <img className='flopPic clickable' src={checkMedia(flop.mediaURL)} onClick={() => {
            dispatch({type: 'CHANGE_VIEW_SINGLE_FLOP', payload: flop.flopId})
            dispatch({type: 'CHANGE_PAGE', payload: `/flops/${flop.flopId}`})
          }} />
          <div className="user">
            <div className="userHead">
              <div className="rank"><p>{flop.rank}.</p></div>
              <div><img className="userThumbnail" src={userPic}/></div>
            </div>
            <p className="clickable usernameLink" onClick={() => {
              dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
              dispatch({type: 'CHANGE_PAGE', payload: `/profile/${flop.username}`})
            }}>{flop.username}</p>
          </div>

          <p>{flop.description}</p>
          <button className={'btn upvote clickable noselect '+userUpvote} onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</button>
          <button className={'btn downvote clickable noselect '+userDownvote} onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</button>
        </div>
      )
    })
}


function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (
    <div className='lifestyleHeader' key={lifestyle.lifestyleId}>
      <h2>{lifestyle.title}</h2>
      <p>{lifestyle.description}</p>
    </div>))
}

function checkMedia(mediaURL){
  if(mediaURL){
    var extension = mediaURL.slice(mediaURL.length - 3, mediaURL.length)
    if(extension == 'mp4' || extension == 'ebm' || extension == 'ogg' || extension == 'mov'){
      return "http://cache.trustedpartner.com/images/library/AfterHoursPediatrics2010/Content/Video-Icon.jpg"
    }
    return mediaURL
  }
}

module.exports = Flops
