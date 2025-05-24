import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import ToggleButton from './components/ToggleButton'
import Toggle from './components/Toggle'
import { useDebounce } from 'react-use'

const BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjhmOTM3OWRmNWFkYzNkZmY5ODVhYTcxYmQxM2U5ZCIsIm5iZiI6MTcwMzA4OTQ3Ni40MTY5OTk4LCJzdWIiOiI2NTgzMTU0NGVhN2IwZTUyNzcyNzA1M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0dJk34EnevHf6Za6urQ43AZwR_PAJVU2dGy69tjUetU"

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
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('')

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const [likedMovies, setLikedMovies] = useState([]);

    function likeMovie(id) {
      setLikedMovies(prevLiked => [...prevLiked, id])
    }

  function unlikeMovie(id) {
      setLikedMovies(prevLiked => prevLiked.filter((liked) => liked !== id))
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
      console.log(movieList)
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
          <Search searchKey={searchKey} searchTerm={searchTerm} />
        </header>

        <section className="all-movies">
          
          <h2 className='mt-4'>All Movies</h2>
          <div className='flex justify-between'>
              <ToggleButton text='adult' isOn={showAdult} onToggle={() => setShowAdult(!showAdult)} />
          </div>

          


          {loading ? <Spinner /> : errorMessage ?
           <p className='text-red-500 text-center mt-[40px]'>{errorMessage}</p> :
           movieList.length === 0 ? <p className='text-red-500 text-center mt-[40px]'>No movies matching your search term.</p> :
            <ul>
              {movieList.map(movie => 
              <MovieCard
              key={movie.id} 
               unlikeMovie={unlikeMovie} 
               likeMovie={likeMovie} 
               showAdult={showAdult} 
               movie={movie} 
               isLiked={likedMovies.includes(movie.id)}
               />)}
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