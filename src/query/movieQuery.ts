import gql from 'graphql-tag'

export const GET_MOVIE_QUERY = gql`
query getMovie {
  entries(section: "movies") {
    ... on movies_default_Entry {
      id
      title
      description
      genre
      release
      length
      featureImage {
        url
        id
        title
      }
    }
  }
  entryCount(section: "movies")
}`