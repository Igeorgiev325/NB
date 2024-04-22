import gql from 'graphql-tag'

export const GET_MOVIE_DEFAULT_IMAGE = gql`
query getDefaultImage {
  asset (title: "Default movie") {
    ... on images_Asset {
      id
      url
      title
    }
  }
}
`