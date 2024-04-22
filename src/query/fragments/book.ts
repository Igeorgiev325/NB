import gql from 'graphql-tag'

export const bookFragment = gql`
  fragment book on books_default_Entry {
    id
    title
    pages
  }
`