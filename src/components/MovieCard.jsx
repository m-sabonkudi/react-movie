import React, { useState } from 'react'
import LikeButton from './LikeButton'

function MovieCard({showAdult, isLiked, unlikeMovie, likeMovie, movie, movie: {id, title, vote_average, poster_path, release_date, original_language, adult}}) {

  return (
    <div className='movie-card'>
        <img src={poster_path ? 
        `https://image.tmdb.org/t/p/w500/${poster_path}` 
        : '/no-movie.png'} alt={title} />

        <div className="mt-4">
            <h3>{title}</h3>

            <div className="content">
                <div className="rating">
                    {/* <img src="star.svg" alt="Star Icon" /> */}
                    <p>Rating: {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>-</span>
                <p className="lang">{original_language}</p>

                <span>-</span>
                <span className="year">{release_date ? release_date.split('-')[0]: 'N/A'}</span>

                {showAdult && <><span>-</span><span className="text-white">Adult: {adult ? 'True' : 'False'}</span></>}

                <br />
                <LikeButton unlikeMovie={unlikeMovie} likeMovie={likeMovie} movie={movie} isLiked={isLiked} />
            </div>
        </div>
    </div>
    )
}

export default MovieCard