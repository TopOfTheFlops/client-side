import React from 'react'

import Header from './Header'
import Nav from './Nav'

import postNewFlop from '../api/postNewFlop'
import callCloudinary from '../widget'

function CreateFlop ({state, dispatch}) {
  function createNewFlop (e) {
    e.preventDefault()
    var flopInfo = {
      userId: state.currentUser.userId,
      mediaURL: state.currentPhotoURLs,
      description: document.getElementById('description').value,
      lifestyleId: state.currentLifestyleId
    }
    postNewFlop(dispatch, flopInfo)
  }

  function goBack (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
  }

  return (
    <div>
      <Header />
      <div className="buttonGroup dashboardButtons">
        <button onClick={goBack}>back</button>
      </div>
      <h2>Create a Flop</h2>
      {RenderTitle(state)}
      <form>
        <label>Describe your entry</label>
        <input placeholder='Description' type='text' id='description' />
        <div className='btn upload_widget_opener' onClick={(e) => {
          e.preventDefault()
          callCloudinary(dispatch)
        }
      }><p>+</p></div>
        <input className='btn' type='submit' value='compete!' onClick={createNewFlop} />
      </form>
      <div className='clear' />
      <Nav dispatch={dispatch} state={state} />
    </div>
  )
}

function RenderTitle (state) {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles
    .filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId)
    .map(lifestyle => (<h2 key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

module.exports = CreateFlop
