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
  return (
    <div>
      <Header />
      <h2>Create a Lifestyle</h2>
      <form className='newLifestyleForm'>
        <p>What is this lifestyle's name?</p>
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
