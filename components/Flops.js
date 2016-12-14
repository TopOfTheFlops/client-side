import React from 'react'

import Header from './Header'
import Nav from './Nav'
import voteFlop from '../api/voteFlop'

const { RenderFlops, RenderTitle, checkMedia} = require('../helpers/flops')

const Flops = ({state, dispatch}) => {
  const goToCreateFlop = e => {
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

module.exports = Flops
