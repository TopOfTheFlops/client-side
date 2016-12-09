import React from 'react'
import Header from './Header'
import Nav from './Nav'

function Profile({state}) {
  return (
    <div>
      <Header />
      <h3>Your Profile</h3>
      <div className="profile">
        <img className='profilePic' src={state.currentFlopper.profilePic}/>
        <div className="profileInfo">
          <h2 >{state.currentFlopper.name}</h2>
          <p>{state.currentFlopper.bio}</p>
        </div>
      </div>
      {SortFlops(state)}
      <Nav />
    </div>
  )
}

function SortFlops(state) {
  const {flops, lifestyles} = state
  return lifestyles
  .map(lifestyle => {
  return flops
    .filter( flop => flop.lifestyleId == lifestyle.lifestyleId)
    .sort((a,b) => b.upvotes - a.upvotes)
    .map((flop, index) => {
      flop.rank = index+1
      console.log(flop);
      if (flop.name == state.currentFlopper.name)
      return (
        <div>
          <h2>#{flop.rank}</h2>
          {getTitle(flop, lifestyle)}
        </div>)
  })
})
}

function getTitle (flop, lifestyle){
  flop.lifestyleId == lifestyle.lifestyleId
  return <h2>{lifestyle.title}</h2>
}

module.exports = Profile
