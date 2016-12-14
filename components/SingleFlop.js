import React from 'react'

import Header from './Header'
import Nav from './Nav'

import deleteFlop from '../api/deleteFlop'
import voteFlop from '../api/voteFlop'

const { RenderTitle, RenderDeleteButton, RenderFlop, RenderMedia } = require('../helpers/singleFlop')

const Flops = ({state, dispatch}) => {
  const goToCreateFlop = e => {
    dispatch({type: 'CHANGE_PAGE', payload: '/flops/new'})
  }
  const goBack = e => {
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




module.exports = Flops
