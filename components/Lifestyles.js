import React from 'react'

const Lifestyles = ({state, dispatch}) => {
  return (
    <div className='lifestyles'>
      {lifeDash(state, dispatch)}
    </div>
  )
}

module.exports = Lifestyles
