import gql from 'graphql-tag'

export const movieFragment = {
    movie: gql`
    fragment ... on movies_default_Entry {
        id
        title
        description
        genre
        release
        length
    }
    `
}