import React from 'react'
import Header from './Header'
import Nav from './Nav'

function CreateFlop({state, dispatch}) {
  return (
    <div>
      <Header />
      <h2>Flopping In</h2>
      <form>
        <h3>{RenderTitle(state)}</h3>
        <input placeholder='Image url' type="text"/>
        <h3>Describe your entry</h3>
        <input placeholder='Description' type="text"/>
      </form>
      <button className='create'>Compete!</button>
      <Nav dispatch={dispatch} state={state}/>
    </div>
  )
}

function RenderTitle(state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles.filter( lifestyle => lifestyle.lifestyleId == currentLifestyleId).map(lifestyle => (<h2>{lifestyle.title}</h2>))
}


module.exports = CreateFlop
