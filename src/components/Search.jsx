import React from 'react'

function Search({ searchTerm, searchKey, readOnly }) {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt=""
            />

            <input type="text"
            value={searchTerm}
            placeholder={readOnly ? 'go to all movies to search' : 'Search movies...'}
            onChange={event => searchKey(event.target.value)}
            readOnly={readOnly}
            />
        </div>
    </div>
  )
}

export default Search