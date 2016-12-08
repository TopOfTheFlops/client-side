import React from 'react'
import Button from './Button'

function Lifestyles({state}) {
  return (
    <div>
      {lifeDash(state)}
      <button className='create'>create new lifestyle</button>
    </div>
  )
}

function lifeDash(state){
  var {lifestyles} = state
  return lifestyles.map(function(lifestyle){

    return (
      <div className="lifestyle">
        <h4>{lifestyle.title}</h4>
        <div className='lifeScores'>
          <img className="lifestylePic" src={lifestyle.media}/>
          {getTopThree(state, lifestyle.lifestyleId)}
        </div>
      </div>
    )
  })
}

function getTopThree(state, id) {
  var {lifestyles, flops, currentFlopper} = state
  return (
    <div className='topThree'>
      { flops
        .filter( flop => flop.lifestyleId === id)
        .sort((a,b) => b.upvotes - a.upvotes)
        .filter((flop, index) => {
          flop.rank = index+1
          return flop.userId == currentFlopper.flopperId || index < 3
        })
        .map( flop => {
          return <div>{flop.rank} {flop.name} {flop.upvotes} </div>
          // || <div>{count} {currentFlopper.name}</div>
        })
    }
    </div>
  )
}

module.exports = Lifestyles
