import React from 'react'

import Header from './Header'
import Nav from './Nav'
import Lifestyles from './Lifestyles'

import refreshState from '../api/refreshState'

import Loader from 'halogen/PulseLoader'


const Dashboard = ({state, dispatch}) => {
  const goToCreateLifestyle = e => {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/lifestyles/new'})
  }
  const actionRefreshState = e => {
    e.preventDefault()
    refreshState(dispatch)
  }
  if (state.requestingFlops && state.requestingLifestyles) {
    return <div className="dashboardLoader"><Loader color="#f64161"/></div>
  } else {
    return (
      <div>
        <Header />
        <div className="buttonGroup dashboardButtons">
          <div className='btn clickable' onClick={actionRefreshState}>refresh</div>
          <div className='btn clickable' onClick={goToCreateLifestyle}>create new lifestyle</div>
        </div>
        <Lifestyles state={state} dispatch={dispatch} />
        <div className='clear' />
        <Nav state={state} dispatch={dispatch} />
      </div>
    )
  }
}

module.exports = Dashboard
