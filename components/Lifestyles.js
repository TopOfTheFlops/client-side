import React from 'react'

function Lifestyles ({state, dispatch}) {
  return (
    <div className='lifestyles'>
      {lifeDash(state, dispatch)}
    </div>
  )
}

function lifeDash (state, dispatch) {
  var {lifestyles} = state
  return lifestyles.map(function (lifestyle, index) {
    return (
      <div className='lifestyle' key={index}>
        <h4 className='clickable hoverColorChange' onClick={() => {
          dispatch({type: 'CHANGE_CURRENTLIFESTYLEID', payload: lifestyle.lifestyleId})
          dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
        }}>{lifestyle.title}</h4>
        <img className='lifestylePic clickable' src={lifestyle.media} onClick={() => {
          dispatch({type: 'CHANGE_CURRENTLIFESTYLEID', payload: lifestyle.lifestyleId})
          dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
        }}/>
        {getTopThree(state, dispatch, lifestyle.lifestyleId)}
      </div>
    )
  })
}

function getTopThree (state, dispatch, lifestyleId) {
  var {lifestyles, flops, currentUser} = state
  var hasAddedOwnRank = false
  return (
    <div className='topThree'>
      {flops
        .filter(flop => flop.lifestyleId === lifestyleId)
        .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        .filter((flop, index) => {
          flop.rank = index + 1
          if(flop.userId === state.currentUser.userId && !hasAddedOwnRank) {
            hasAddedOwnRank = true
            return true
          } else {
            return index < 3
          }
        })
        .map((flop, index) => {
          var customClass = flop.username === state.currentUser.username ? 'currentUser' : ''
          var userPic = state.allUsers.find(user => user.userId === flop.userId).profilePic
          return (
          <div className={customClass+" user"} key={index}>
            <div>
            <img className="userThumbnail" src={userPic}/>
            </div>

            <p className="clickable usernameLink" onClick={() =>{
              dispatch({type: 'CHANGE_CURRENT_VIEW_USER_ID', payload: flop.userId})
              dispatch({type: 'CHANGE_PAGE', payload: `/profile/${flop.username}`})
            }}><bold>{flop.rank}.</bold> {flop.username}</p>

          </div>
          )
        })
    }
    </div>
  )
}

module.exports = Lifestyles
