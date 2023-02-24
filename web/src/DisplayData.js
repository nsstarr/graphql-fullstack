import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { useState } from 'react'

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`

const QUERY_ALL_MOVIES = gql`
  query getAllMovies {
    movies {
      name
    }
  }
`

const GET_MOVIE_BY_NAME = gql`
  query getMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`

export default function DisplayData() {
  const [searchedMovie, setSearchedMovie] = useState('')
  const { data, loading, error } = useQuery(QUERY_ALL_USERS, QUERY_ALL_MOVIES)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
  const [fetchMovie, { data: movieSearchData, error: movieSearchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME)

  if (loading) {
    ;<h1>Loading...</h1>
  }
  if (error) {
    console.log(error.message)
  }
  if (data) {
    console.log(data)
  }

  if (movieSearchError) {
    console.log(movieSearchError.message)
  }
  return (
    <div>
      {data &&
        data.users.map(user => {
          return (
            <div key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          )
        })}

      {movieData &&
        movieData.movies.map(movie => {
          return <h1 key={Math.random()}>Movie Name: {movie.name}</h1>
        })}

      <div>
        <input
          type='text'
          placeholder='Interstellar..'
          onChange={event => {
            setSearchedMovie(event.target.value)
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: searchedMovie,
              },
            })
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>Movie Name: {movieSearchData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieSearchError && <h1>There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  )
}
