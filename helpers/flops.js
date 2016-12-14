import React from 'react'

const RenderTitle = state => {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (
    <div className='lifestyleHeader' key={lifestyle.lifestyleId}>
    <h2>{lifestyle.title}</h2>
    <p>{lifestyle.description}</p>
    </div>))
}

const checkMedia = mediaURL => {
  if(mediaURL){
    var extension = mediaURL.slice(mediaURL.length - 3, mediaURL.length)
    if(extension == 'mp4'){
      return "https://c3metrics.com/wp-content/uploads/2016/08/feature-video-thumbnail-overlay.png"
    }
    return mediaURL
  }
}

const RenderFlops = (state, dispatch) => {
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
      <button className='upvote clickable' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 1, 0)} >{flop.upvotes}</button>
      <button className='downvote clickable' onClick={() => voteFlop(dispatch, state, flop.flopId, state.currentUser.userId, 0, 1)}>{flop.downvotes}</button>
      </div>
    )
  })
}

module.exports = {
  RenderTitle,
  checkMedia,
  RenderFlops
}
