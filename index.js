import React from 'react'
import { render } from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'
import Router from 'sheet-router'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Flops from './components/Flops'
import CreateLifestyle from './components/CreateLifestyle'
import CreateFlop from './components/CreateFlop'
import Profile from './components/Profile'
import Signup from './components/Signup'
import Unauthenticated from './components/Unauthenticated'
import SingleFlop from './components/SingleFlop'

var main = document.querySelector('main')

var initialState = {
  loginInfo: {username: "", password: "", bio: "", profilePic: ""},
  currentPage: '/',
  currentLifestyleId: 1,
  lifestyles: [],
  flops: [],
  currentUser: {},
  viewSingleFlopId: null
}


const {dispatch, getState, subscribe} = createStore(reducer, initialState)

const route = Router({default: '/404'}, [
  ['/', (params) => Login],
  ['/signup', (params) => Signup],
  ['/flops', (params) => Flops],
  ['/flops/:id', (params) => SingleFlop],
  ['/flops/new', (params) => CreateFlop],
  ['/lifestyles', (params) => Dashboard],
  ['/lifestyles/new', (params) => CreateLifestyle],
  ['/profile', (params) => Profile],
  ['/unauthenticated', (parmas) => Unauthenticated]
])

subscribe(() => {
  var Component = route(getState().currentPage)
  render(<Component state={getState()} dispatch={dispatch}/>, main)
})

dispatch({type: 'INIT'})

