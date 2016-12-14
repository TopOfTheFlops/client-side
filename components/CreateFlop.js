import React from 'react'

import Header from './Header'
import Nav from './Nav'

import postNewFlop from '../api/postNewFlop'
import callCloudinary from '../widget'

const RenderTitle = state => {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles
  .filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId)
  .map(lifestyle => (<h2 key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}

const CreateFlop = ({state, dispatch}) => {
  const createNewFlop = e => {
    e.preventDefault()
    const flopInfo = {
      userId: state.currentUser.userId,
      mediaURL: state.currentPhotoURLs,
      description: document.getElementById('description').value,
      lifestyleId: state.currentLifestyleId
    }
    postNewFlop(dispatch, flopInfo)
  }

  const goBack = e => {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/flops'})
  }

  return (
    <div>
      <Header />
      <h2>Flopping</h2>
      {RenderTitle(state)}
      <button onClick={goBack}>back</button>
      <form>
        <label>Describe your entry</label>
        <input placeholder='Description' type='text' id='description' />
        <button className='upload' id='upload_widget_opener' onClick={(e) => {
          e.preventDefault()
          callCloudinary(dispatch)
        }
        }>Click to upload File</button>
        <input className='loginButton' type='submit' value='compete!' onClick={createNewFlop} />
      </form>
      <div className='clear' />
      <Nav dispatch={dispatch} state={state} />
    </div>
  )
}


module.exports = CreateFlop
