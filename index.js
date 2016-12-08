import React from 'react'
import { render } from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'
import Router from 'sheet-router'

import Login from './components/Login'
import Dashboard from './components/Dashboard'

var main = document.querySelector('main')

var initialState = {
  currentPage: 'login',
  header: 'top of the flops',
  lifestyles: [
    {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
    {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2},
  ],
  currentFlopper: {
    flopperId: 1,
    name: 'lord master',
    profilePic: 'imgur.com/flj2530',
    bio: 'Im good at things!',
    lifestylesFollowing: ['lasagna', 'cup stacking'],
    floppersFollowing: [1,3,4]
  },
    flops: [
    {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
    {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
    {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
    {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 5}
  ]
}


const {dispatch, getState, subscribe} = createStore(reducer, initialState)

const route = Router({default: '/404'}, [
  ['/login', (params) => Login],
  ['/', (params) => Dashboard]
])

subscribe(() => {
  var Component = route(getState().currentPage)
  render(<Component state={getState()} dispatch={dispatch} />, main)
})

dispatch({type: 'INIT'})
