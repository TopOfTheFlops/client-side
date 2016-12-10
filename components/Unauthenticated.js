import React from 'react'

function Unauthenticated ({state, dispatch}) {
  return (
    <div>
      <p>Error: 401, failed to post flop</p>
      <p>unauthenticated</p>
    </div>
  )
}

module.exports = Unauthenticated
