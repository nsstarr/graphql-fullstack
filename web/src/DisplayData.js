import { useQuery, gql } from '@apollo/client'

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

export default function DisplayData() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS, QUERY_ALL_MOVIES)
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES)

  if (loading) {
    <h1>Loading...</h1>
  }
  if (error) {
    console.log(error.message)
  }
  if (data) {
    console.log(data)
  }
  return (
    <div>
      {data &&
        data.users.map(user => {
          return (
            <div key={Math.random()}>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          )
        })}

      {movieData &&
        movieData.movies.map((movie) => {
          return <h1 key={Math.random()}>Movie Name: {movie.name}</h1>
        })}
    </div>
  )
}
