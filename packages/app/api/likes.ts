import { client } from './client';
import { gql } from 'graphql-request';

export class LikesBackend {
  async userLikes() {
    return client
      .request(
        gql`
          {
            userLikes {
              imageUrl
              description
              title
              artist
              id
              videoUrl
            }
          }
        `
      )
      .then(({ userLikes }: any) => userLikes)
      .catch((e) => console.error(e));
  }
  async entryLikes(id: string) {
    return client
      .request(
        gql`
      {
        entryLikes(id: "${id}") {
          count
          users {
            avatarUrl
            displayName
            username
            id
  	      }
        }
      }
      `
      )
      .then(({ entryLikes }: any) => entryLikes)
      .catch((e) => console.error(e));
  }
  async like(id: string, like = true) {
    return client
      .request(
        gql`
        mutation {
          likeEntry(id: "${id}", like: ${like})
        }
      `
      )
      .then(({ likeEntry }: any) => likeEntry)
      .catch((e) => console.error(e));
  }
}

export const likesBackend = new LikesBackend();
