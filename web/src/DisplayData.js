import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client'
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

const CREATE_USER_MUTATION = gql`
  mutation createUser ($input : CreateUserInput!) {
    createUser (input: $input) {
      name 
      id
    }
  }
`

export default function DisplayData() {
  const [searchedMovie, setSearchedMovie] = useState('')

  //Create User States
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState('')

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)
  const [fetchMovie, { data: movieSearchData, error: movieSearchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME)

  const [createUser] = useMutation(CREATE_USER_MUTATION)

  if (loading) {
    <h1>Loading...</h1>
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
      <div>
        <input
          type='text'
          placeholder='name...'
          onChange={e => {
            setName(e.target.value)
          }}
        />
        <input
          type='text'
          placeholder='username...'
          onChange={e => {
            setUsername(e.target.value)
          }}
        />
        <input
          type='number'
          placeholder='age...'
          onChange={e => {
            setAge(e.target.value)
          }}
        />
        <input
          type='text'
          placeholder='nationality...'
          onChange={e => {
            setNationality(e.target.value.toUpperCase())
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: { input: { name, username, age: Number(age), nationality } },
            })

            refetch()
          }}
        >
          Create User
        </button>
      </div>
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
