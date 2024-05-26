import gql from 'graphql-tag'

export const GET_MOVIE_QUERY = gql`
query getMovie ($getMovieTitle: [String], $getGenreParam: [QueryArgument]) {
  entries(section: "movies", title: $getMovieTitle, genre: $getGenreParam) {
    ... on movies_default_Entry {
      id
      title
      description
      genre
      release
      length
      featureImage {
        id
        title
        url
      }
    }
  }
  entryCount(section: "movies")
}`