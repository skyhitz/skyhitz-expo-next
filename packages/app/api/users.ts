import { User } from '../models/user.model';
import { usersIndex } from '../algolia/algolia';

export class UsersBackend {
  async search(q: string) {
    if (!q) {
      return [];
    }

    const { hits } = await usersIndex.search(q);
    return hits.map((user: any) => new User(user));
  }

  async getRecentSearches(): Promise<User[]> {
    return [];
  }

  async getTopSearches(): Promise<User[]> {
    return [];
  }
}

export const usersBackend = new UsersBackend();
