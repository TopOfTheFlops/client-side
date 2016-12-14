import React from 'react'

const RenderTitle = state => {
  const {lifestyles, currentLifestyleId} = state
  return lifestyles
  .filter(lifestyle => lifestyle.lifestyleId == currentLifestyleId)
  .map(lifestyle => (<h2 key={lifestyle.lifestyleId}>{lifestyle.title}</h2>))
}


module.exports = RenderTitle
