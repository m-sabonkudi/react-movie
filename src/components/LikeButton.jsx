import React from 'react'

function LikeButton({ isLiked, likeMovie, unlikeMovie, movie }) {
  return (
    <button className='btn text-2xl' onClick={() => 
        isLiked ? unlikeMovie(movie) : likeMovie(movie)
    }>{isLiked ? '❤️' : '🤍'}</button>
  )
}

export default LikeButton