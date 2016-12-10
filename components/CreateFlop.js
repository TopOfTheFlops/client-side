import React from 'react'

import Header from './Header'
import Nav from './Nav'

import postNewFlop from '../api/postNewFlop'

function CreateFlop({state, dispatch}) {

  function createNewFlop (e) {
    console.log('Creating new flop');
    e.preventDefault()
    var flopInfo = {
      userId: state.currentUser.userId,
      mediaURL: document.getElementById('mediaURL').value,
      description: document.getElementById('description').value,
      lifestyleId: state.currentLifestyleId
    }
    postNewFlop(dispatch, flopInfo)
  }

  return (
    <div>
      <Header />
      <h2>Flopping</h2>
      {RenderTitle(state)}
      <form>
        <input placeholder='Image url' type="text" id='mediaURL'/>
        <label>Describe your entry</label>
        <input placeholder='Description' type="text" id='description'/>
        <input className='loginButton' type='submit' value='compete!' onClick={createNewFlop}/>
      </form>
      <Nav dispatch={dispatch} state={state}/>
    </div>
  )
}

function RenderTitle(state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles
    .filter( lifestyle => lifestyle.lifestyleId == currentLifestyleId)
    .map(lifestyle => (<h2 key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}


module.exports = CreateFlop
