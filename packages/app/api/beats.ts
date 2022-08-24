import { gql } from '@apollo/client'

export const RECENTLY_ADDED = gql`
  query recentlyAdded($page: Int) {
    recentlyAdded(page: $page) {
      imageUrl
      videoUrl
      description
      title
      id
      artist
      code
      issuer
    }
  }
`
