function getLifestyles() {
  return [
    {title: 'Best Lasagna', description: 'The person that can make the best lasagna', lifestyleId: 1},
    {title: 'Best Cake', description: 'The person that can make the best cake', lifestyleId: 2}
    ]
}

function getFlops() {
  return [
    {flopId: 1, lifestyleId: 1, upvotes: 7, downvotes: 5},
    {flopId: 2, lifestyleId: 1, upvotes: 5, downvotes: 5},
    {flopId: 3, lifestyleId: 2, upvotes: 5, downvotes: 5},
    {flopId: 4, lifestyleId: 1, upvotes: 5, downvotes: 6}
  ]
}

function getCurrentFlopper() {
  return {
    flopperId: 1,
    name: 'lord master',
    profilePic: 'imgur.com/flj2530',
    bio: 'Im good at things!',
    lifestylesFollowing: ['lasagna', 'cup stacking'],
    floppersFollowing: [1,3,4]
  }
}

module.exports = {
  getLifestyles,
  getFlops,
  getCurrentFlopper
}
