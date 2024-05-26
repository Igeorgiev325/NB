import gql from 'graphql-tag'

export const GET_DROPDOWN_ITEMS_QUERY = gql`
query getGenre ($filterGenre: [QueryArgument]) {
  entries (section: "movies", genre: $filterGenre) {
    ... on movies_default_Entry {
      genre
      release
    }
  }
}
`