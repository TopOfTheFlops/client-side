import React from 'react'

function Lifestyles ({state, dispatch}) {
  function goToCreateLifestyle (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/createlifestyle'})
  }
  return (
    <div className='lifestyles'>
      <button className='create' onClick={goToCreateLifestyle}>create new lifestyle</button>
      {lifeDash(state, dispatch)}
    </div>
  )
}

function lifeDash (state, dispatch) {
  var {lifestyles} = state
  return lifestyles.map(function (lifestyle, index) {
    return (
      <div className='lifestyle' key={index} onClick={() => {
        dispatch({type: 'CHANGE_CURRENTLIFESTYLEID', payload: lifestyle.lifestyleId})
        dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
      }}>
        <h4>{lifestyle.title}</h4>
        <img className='lifestylePic' src={lifestyle.media} />
        {getTopThree(state, lifestyle.lifestyleId)}
      </div>
    )
  })
}

function getTopThree (state, lifestyleId) {
  var {lifestyles, flops, currentUser} = state
  return (
    <div className='topThree'>
      { flops
        .filter(flop => flop.lifestyleId === lifestyleId)
        .sort((a, b) => b.upvotes - a.upvotes)
        .filter((flop, index) => {
          flop.rank = index + 1
          return flop.userId === lifestyleId || index < 3
        })
        .map((flop, index) => {
          var customClass = flop.username === state.currentUser.username ? 'currentUser' : 'otherUser'
          return <div className={customClass} key={index}>{flop.rank}. {flop.username} {flop.upvotes} </div>
        })
    }
    </div>
  )
}

module.exports = Lifestyles
