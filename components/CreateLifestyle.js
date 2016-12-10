import React from 'react'
import Header from './Header'
import Nav from './Nav'

function CreateLifestyle({state, dispatch}) {
  return (
    <div>
      <Header />
      <h2>Create a Lifestyle</h2>
      <form>
        <h3>What is this lifestyles name?</h3>
        <input placeholder='Name' type="text"/>
        <h3>Briefly describe what this lifestyle is about</h3>
        <input placeholder='Description' type="text"/>
        <h3>Give the lifestyle a profile picture (optional)</h3>
        <input placeholder='Image url' type="text"/>
      </form>
      <button className='create'>Go!</button>
      <Nav state={state} dispatch={dispatch}/>
    </div>
  )
}


module.exports = CreateLifestyle
