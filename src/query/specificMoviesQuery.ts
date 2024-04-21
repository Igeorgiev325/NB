import gql from 'graphql-tag'
import { movieFragment } from './fragments/movie'

export const GET_SPECIFIC_MOVIE = gql`
  query getMovieByGenre ($genre: [QueryArgument], $section: [String]) {
    entries (genre: $genre, section: $section) {
      ...movie
      ... on books_default_Entry {
        id
        title
      }
    }
  }
  ${movieFragment}
`