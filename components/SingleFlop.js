import React from 'react'

import Header from './Header'
import Nav from './Nav'

import deleteFlop from '../api/deleteFlop'
import voteFlop from '../api/voteFlop'

function Flops ({state, dispatch}) {
  function goToCreateFlop (e) {
    dispatch({type: 'CHANGE_PAGE', payload: '/flops/new'})
  }
  function goBack (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
  }
  return (
    <div>
      <Header />
      {RenderTitle(state)}
      <div className="buttonGroup dashboardButtons">
        <div className="clickable btn" onClick={goBack}>back</div>
      </div>
      {RenderFlop(state, dispatch)}
      <div className='clear' />
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

function RenderFlop (state, dispatch) {
  return state.flops
    .filter( flop  => flop.flopId === state.viewSingleFlopId)
    .map(flop => {
      var userPic = state.allUsers.find(user => user.userId === flop.userId).profilePic
      var foundVote = state.votes.filter(vote => vote.flopId === flop.flopId && vote.userId === state.currentUser.userId)
      var userUpvote = foundVote.length > 0 && (Number(foundVote[0].upvote) === 1) ? "userHasVoted" : ""
      var userDownvote = foundVote.length > 0 && (Number(foundVote[0].downvote) === 1) ? "userHasVoted" : ""
      return (
        <div className='flop' key={flop.flopId}>
          {RenderMedia(flop.mediaURL)}
          <p className="usernameLink clickable" onClick={() => {
            dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
            dispatch({type: 'CHANGE_PAGE', payload: `/profile/${flop.username}`})
          }}>{flop.rank}. {flop.username}</p>
          <p>{flop.description}</p>
          <div className="buttonGroup">
            <div className={'btn upvote clickable noselect '+ userUpvote} onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</div>
            <div className={'btn downvote clickable noselect '+ userDownvote} onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</div>
          </div>
          {RenderDeleteButton(dispatch, flop, state.currentUser.userId)}
        </div>
      )
    })
}

function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2 className='lifestyleHeader' key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

function RenderDeleteButton(dispatch, flop, userId) {
  if (flop.userId === userId) {
    return <button className='btn delete clickable' onClick={() => deleteFlop(dispatch, flop.flopId)}>Delete Flop</button>
  }
}

function RenderMedia(mediaURL){
  if(mediaURL){
    var extension = mediaURL.slice(mediaURL.length - 3, mediaURL.length)
    if(extension == 'mp4' || extension == 'ogg' || extension == 'mov'){
      var videoType = `video/${extension}`
      return <video width="320" height="240" controls>
      <source src={mediaURL} type={videoType}/>
      </video>
    }
    return <img className='singleflopPic' src={mediaURL}/>
  }
}

module.exports = Flops
