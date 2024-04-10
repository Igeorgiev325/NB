import gql from 'graphql-tag'

export const GET_MOVIE_IMAGE = gql `
query getImage {
    moviesEntries {
        ... on movies_default_Entry {
            featureImage {
                url
                id
                title
            }
        }
    }
}
`