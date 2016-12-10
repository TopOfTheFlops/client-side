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

var main = document.querySelector('main')

var initialState = {
  loginInfo: {username: "", password: "", bio: "", profilePic: ""},
  currentPage: '/',
  currentLifestyleId: 1,
  lifestyles: [],
  flops: [],
  currentUser: {
    userId: 1,
    name: 'lord master',
    profilePic: 'http://abdindia.com/wp-content/uploads/2014/01/lord.jpg',
    bio: 'Im good at things!'
  }
}


const {dispatch, getState, subscribe} = createStore(reducer, initialState)

const route = Router({default: '/404'}, [
  ['/', (params) => Login],
  ['/signup', (params) => Signup],
  ['/dashboard', (params) => Dashboard],
  ['/flops', (params) => Flops],
  ['/createLifestyle', (params) => CreateLifestyle],
  ['/CreateFlop', (params) => CreateFlop],
  ['/profile', (params) => Profile]
])

subscribe(() => {
  var Component = route(getState().currentPage)
  render(<Component state={getState()} dispatch={dispatch}/>, main)
})

dispatch({type: 'INIT'})


//   {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1, media: 'http://assets.bonappetit.com/photos/57ae45a253e63daf11a4e4a9/master/w_1200,c_limit/squash-and-broccoli-rabe-lasagna.jpg'},
//   {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2, media: 'http://www.primrose-bakery.co.uk/shop/content/images/thumbs/0000362_chocolate-layer-cake.jpeg'},
// ]


// {flopId: 1, lifestyleId: 1, userId: '1', name: 'lord master', media: 'https://barilla.azureedge.net/~/media/images/en_us/hero-images/oven-ready-lasagna.jpg', description: 'hello',upvotes: 0, downvotes: 5},
// {flopId: 2, lifestyleId: 1, userId: '2', name: 'james', media: 'https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg', description: 'James is cool',upvotes: 14, downvotes: 5},
// {flopId: 3, lifestyleId: 2, userId: '1', name: 'lord master', media: '', description: 'Michael is nice',upvotes: 5, downvotes: 5},
// {flopId: 4, lifestyleId: 1, userId: '1', name: 'harry', media: 'http://assets.kraftfoods.com/recipe_images/opendeploy/Table-for-Two_Lasagna_640x428.jpg', description: 'Kate is good',upvotes: 5, downvotes: 5}
