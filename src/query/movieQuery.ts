import gql from 'graphql-tag'

export const GET_MOVIE_QUERY = gql`
query getMovie ($getValueFromSearch: [String], $dropdownGenre: [QueryArgument]) {
  entries(section: "movies", title: $getValueFromSearch, genre: $dropdownGenre) {
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