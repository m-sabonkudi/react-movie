import React from 'react'

function Search({ searchTerm, searchKey }) {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt=""
            />

            <input type="text"
            value={searchTerm}
            placeholder='Search movies...'
            onChange={event => searchKey(event.target.value)}
            />
        </div>
    </div>
  )
}

export default Search