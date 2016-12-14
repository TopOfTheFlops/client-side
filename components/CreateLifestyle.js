import React from 'react'

import Header from './Header'
import Nav from './Nav'

import postNewLifestyle from '../api/postNewLifestyle'
import callCloudinary from '../widget'

function CreateLifestyle ({state, dispatch}) {
  function createNewLifestyle (e) {
    e.preventDefault()
    var lifestyleInfo = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      media: state.currentPhotoURLs
    }
    postNewLifestyle(dispatch, lifestyleInfo)
  }

  function goBack (e) {
    e.preventDefault()
    dispatch({type: 'CHANGE_PAGE', payload: '/lifestyles'})
  }

  return (
    <div>
      <Header />
      <div className="buttonGroup dashboardButtons">
        <div className ='btn clickable' onClick={goBack}>back</div>
      </div>  
      <h2>Create a Lifestyle</h2>
      <form>
        <p>What is this lifestyles name?</p>
        <input placeholder='Name' type='text' id='title' />
        <p>Briefly describe what this lifestyle is about</p>
        <input placeholder='Description' type='text' id='description' />
        <button className='upload' id='upload_widget_opener' onClick={(e) => {
          e.preventDefault()
          callCloudinary(dispatch)
        }
        }>Give the lifestyle a profile picture</button>
        <input className='create' type='submit' value='Go!' onClick={createNewLifestyle} />
      </form>
      <Nav state={state} dispatch={dispatch} />
    </div>
  )
}

module.exports = CreateLifestyle
