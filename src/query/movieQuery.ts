import gql from 'graphql-tag'

export const GET_MOVIE_QUERY = gql`
query getMovie {
    moviesEntries {
      ... on movies_default_Entry {
        id
        title
        release
        length
        description
        pic {
            img
        }
      }
    }
}`