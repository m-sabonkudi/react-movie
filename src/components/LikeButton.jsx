import React from 'react'

function LikeButton({ isLiked, likeMovie, unlikeMovie, id }) {
  return (
    <button className='btn text-2xl' onClick={() => 
        isLiked ? unlikeMovie(id) : likeMovie(id)
    }>{isLiked ? '❤️' : '🤍'}</button>
  )
}

export default LikeButton