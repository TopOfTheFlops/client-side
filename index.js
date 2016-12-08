import React from 'react'
import { render } from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'

import App from './components/App'

var main = document.querySelector('main')

var initialState = {
  currentPage: 'login',
  lifeStyles: [
    {
      title: 'Best Lasagna',
      description: 'The person that can make the best lasagna',
      flops: {
        flopper: 'michael',
        flopID: 1,
        media: 'imgur.com/1345lkj'
        description: 'This is my best lasagna currently'
      }
   ]
    currentFlopper: {
      flopperID: 1,
      name: 'lord master',
      profilePic: 'imgur.com/flj2530',
      bio: 'Im good at things!',
      lifeStylesFollowing: ['lasagna', 'cup stacking'],
      floppersFollowing: [1,3,4]
    }
}

const {dispatch, getState, subscribe} = createStore(reducer, initialState)

subscribe(() => {
  render(<App name='TopOfTheFlopsClient' />, main)
})

dispatch({type: 'INIT'})
