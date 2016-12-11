import React from 'react'

import Header from './Header'
import Nav from './Nav'

import postNewLifestyle from '../api/postNewLifestyle'

function CreateLifestyle({state, dispatch}) {
  function createNewLifestyle (e) {
    e.preventDefault()
    var lifestyleInfo = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      media: document.getElementById('media').value
    }
    console.log(lifestyleInfo);
    postNewLifestyle(dispatch, lifestyleInfo)
  }
  return (
    <div>
      <Header />
      <h2>Create a Lifestyle</h2>
      <form>
        <h3>What is this lifestyles name?</h3>
        <input placeholder='Name' type="text" id='title'/>
        <h3>Briefly describe what this lifestyle is about</h3>
        <input placeholder='Description' type="text" id='description'/>
        <h3>Give the lifestyle a profile picture (optional) </h3>
        <input placeholder='Image url' type="text" id='media' />
        <input className='create' type='submit' value='Go!' onClick={createNewLifestyle}/>
      </form>
      <Nav state={state} dispatch={dispatch}/>
    </div>
  )
}


module.exports = CreateLifestyle
