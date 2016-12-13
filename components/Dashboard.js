import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Lifestyles from './Lifestyles'
import refreshState from '../api/refreshState'

function Dashboard ({state, dispatch}) {
  function goToCreateLifestyle (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/lifestyles/new'})
  }
  function actionRefreshState (e) {
    e.preventDefault()
    refreshState(dispatch)
  }
  if (state.requestingFlops && state.requestingLifestyles) {
    return (<h1>Loading...</h1>)
  } else {
    return (
      <div>
        <Header />
        <button className='refresh clickable' onClick={actionRefreshState}>Refresh</button>
        <button className='create clickable' onClick={goToCreateLifestyle}>create new lifestyle</button>
        <Lifestyles state={state} dispatch={dispatch} />
        <div className='clear' />
        <Nav state={state} dispatch={dispatch} />
      </div>
    )
  }
}

module.exports = Dashboard
