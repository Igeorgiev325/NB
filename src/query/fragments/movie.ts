import gql from 'graphql-tag'

export const movieFragment =  gql`
  fragment movie on movies_default_Entry {
    id
    title
    genre
  }
`