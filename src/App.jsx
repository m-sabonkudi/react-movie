import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import ToggleButton from './components/ToggleButton'
import Toggle from './components/Toggle'
import { useDebounce } from 'react-use'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(true);
  const [showAdult, setShowAdult] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('')
  const [likedMovies, setLikedMovies] = useState([]);



  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm])


    function likeMovie(movie) {
      setLikedMovies(prevLiked => [...prevLiked, movie])
    }

  function unlikeMovie(movie) {
      setLikedMovies(prevLiked => prevLiked.filter((liked) => liked.id !== movie.id))
    }


  
  
  async function fetchMovies() {
    setLoading(true)

  
    try {

      if (debouncedSearchTerm.trim().length < 2) {
        var endpoint = `${BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=${showAdult}`
      }
      else {
        var endpoint = `${BASE_URL}/search/movie?query=${debouncedSearchTerm}&include_adult=${showAdult}`
      }

      const response = await fetch(endpoint, API_OPTIONS)
      const data = await response.json()

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies.")
        setMovieList([])
        return;
      }

      setMovieList(data.results || [])
    } catch (error) {
      console.error(error)
      setErrorMessage("Error fetching movies.")

    } finally {setLoading(false)}
  }

  function searchKey(query) {
    setSearchTerm(query)
  }

  useEffect(() => {
    fetchMovies();

  }, [showAdult, debouncedSearchTerm])


  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          {/* <img src='./hero.png' /> */}
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchKey={searchKey} searchTerm={searchTerm} readOnly={showLiked} />
        </header>

        <section className="all-movies">

        <div className="flex items-center gap-2 mt-4">
          {/* <h2 className="text-2xl font-semibold text-white">All Movies</h2> */}
          {showLiked 
          ? <button onClick={() => {
            setShowLiked(false)
            
          }} className="text-white underline hover:text-blue-400 transition duration-200">
                Show All Movies
            </button> 
          : <button onClick={() => {
            setShowLiked(true)
          }} className="text-white underline hover:text-blue-400 transition duration-200">
                Show Liked Movies
            </button>
          }

          <p className="text-sm text-gray-300 leading-none"><KeyboardBackspaceIcon /> {showLiked ? 'showing liked movies' : 'showing all movies'}</p>
        </div>

          
          {!showLiked &&
                  <div className='flex justify-between'>
                      <ToggleButton text='adult' isOn={showAdult} onToggle={() => setShowAdult(!showAdult)} />
                  </div>
          }

          
          {
            loading
              ? <Spinner />
            : errorMessage
              ? <p className='text-red-500 text-center mt-[40px]'>{errorMessage}</p>
            : showLiked
              ? likedMovies.length === 0
                ? <p className='text-red-500 text-center mt-[40px]'>
                    You haven't liked any movies.
                  </p>
                : <ul>
                    {likedMovies.map(movie => (
                      <MovieCard
                        key={movie.id}
                        unlikeMovie={() => unlikeMovie(movie)}
                        likeMovie={() => likeMovie(movie)}
                        showAdult={showAdult}
                        movie={movie}
                        isLiked={true}
                      />
                    ))}
                  </ul>
              : movieList.length === 0
                ? <p className='text-red-500 text-center mt-[40px]'>
                    No movies matching your search term.
                  </p>
                : <ul>
                    {movieList.map(movie => (
                      <MovieCard
                        key={movie.id}
                        unlikeMovie={() => unlikeMovie(movie)}
                        likeMovie={() => likeMovie(movie)}
                        showAdult={showAdult}
                        movie={movie}
                        isLiked={likedMovies.some(x => x.id === movie.id)}
                      />
                    ))}
                  </ul>
          }


        </section>
        {/* <footer className='mt-5'>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        </footer> */}
      </div>
    </main>
  )
}

export default App