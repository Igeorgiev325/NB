import gql from 'graphql-tag'

export const GET_GENRE_QUERY = gql`
query getGenre ($genre: [QueryArgument]) {
  entries (section: "movies", genre: $genre) {
    ... on movies_default_Entry {
      genre
      release
    }
  }
}
`