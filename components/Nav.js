import React from 'react'

function Nav ({state, dispatch}) {
  function goToNewsfeed (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/lifestyles'})
  }
  function goToProfile (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: state.currentUser.userId})
    dispatch({type: 'CHANGE_PAGE', payload: '/profile'})
  }
  return (
    <nav>
      <ul>
        <li className="clickable navButton" onClick={goToNewsfeed}>newsfeed</li>
        <li className="clickable navButton" onClick={goToProfile}>profile</li>
      </ul>
    </nav>
  )
}

module.exports = Nav
