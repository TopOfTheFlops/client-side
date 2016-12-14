import React from 'react'

const User = (state, dispatch) => {
  return state.allUsers
    .filter(user => {
      return user.userId == state.currentViewUserId
    })
    .map(user => {
      return (
        <div>
          <h1>{user.username}</h1>
          <img className="profilePic" src={user.profilePic}/>
        </div>
      )
    })
}

const getTitle = (flop, lifestyle) => <h2>{lifestyle.title}</h2>


const SortFlops = (state, dispatch, userId) => {
  const {flops, lifestyles} = state
  return lifestyles
    .map(lifestyle => {
      return flops
      .filter(flop => flop.lifestyleId === lifestyle.lifestyleId)
      .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
      .map((flop, index) => {
        flop.rank = index + 1
        if (flop.userId === userId) {
          return (
            <div>
              {getTitle(flop, lifestyle)}
              <h2>#{flop.rank}</h2>
            </div>
          )
        }
      })
    })
}

module.exports = {
  User,
  getTitle,
  SortFlops
}
