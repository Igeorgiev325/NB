import gql from 'graphql-tag'

export const GET_MOVIE_QUERY = gql`
query getMovie ($getValueFromSearch: [String]) {
  entries(section: "movies", title: $getValueFromSearch) {
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