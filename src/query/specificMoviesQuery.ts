import gql from 'graphql-tag'
import { movieFragment } from './fragments/movie'
import { bookFragment } from './fragments/book'

export const GET_SPECIFIC_MOVIE = gql`
  query getMovieByGenre ($genre: [QueryArgument], $section: [String]) {
    entries (genre: $genre, section: $section) {
      ...movie
      ...book
    }
  }
  ${movieFragment}
  ${bookFragment}
`