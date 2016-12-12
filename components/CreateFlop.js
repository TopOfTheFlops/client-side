import React from 'react'
var imgur = require('imgur');
var unirest = require('unirest')

import Header from './Header'
import Nav from './Nav'

import postNewFlop from '../api/postNewFlop'


function CreateFlop({state, dispatch}) {

  function callAPI() {
    unirest.post('https://imgur-apiv3.p.mashape.com/3/image')
    .header("X-Mashape-Key", 'AwnXEjf7R6mshadV7LQK5RcyinuJp1HUqeUjsnyJAsuYyEuEzL')
    .header("Authorization", "Client-ID 9c34c3606f727ce")
    .attach("image", `${document.getElementById('mediaURL').files[0]}`)
    .end(function (result) {
      console.log(result)
    })
  }

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
        <input placeholder='Image url' type="file" id='mediaURL'/>
        <label>Describe your entry</label>
        <input placeholder='Description' type="text" id='description'/>
        <input className='loginButton' type='submit' value='compete!' onClick={callAPI}/>
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
