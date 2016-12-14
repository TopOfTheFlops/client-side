import React from 'react'

function Nav ({state, dispatch}) {
  function goToNewsfeed (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/lifestyles'})
  }
  function goToProfile (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: state.currentUser.userId})
    dispatch({type: 'CHANGE_PAGE', payload: `/profile/${state.currentUser.username}`})
  }
  var iconFilepath = state.currentpage === 'dashboard' ? './' : '../'

  return (
    <nav>
    <div className='clickable' onClick={goToNewsfeed}>
      <img className='icons' src={iconFilepath+"assets/newsfeed.svg"}/>
      <p className="clickable navButton">newsfeed</p>
    </div>
    <div className='clickable' onClick={goToProfile}>
      <img className='icons' src={iconFilepath+'assets/profile.svg'}/>
      <p className="clickable navButton">profile</p></div>
    </nav>
  )
}

module.exports = Nav
