import { Entry } from '../models/entry.model';
import { User } from '../models/user.model';
import { entriesBackend } from '../api/entries';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { usersBackend } from '../api/users';
import { useEffect } from 'react';

const debounce = require('lodash.debounce');

export const searchingAtom = atom<boolean>({
  key: 'searching',
  default: false,
});
export const loadingRecentSearchesAtom = atom<boolean>({
  key: 'loadingRecentSearches',
  default: false,
});
export const loadingTopSearchesAtom = atom<boolean>({
  key: 'loadingTopSearches',
  default: false,
});
export const loadingRecentlyAddedAtom = atom<boolean>({
  key: 'loadingRecentlyAdded',
  default: false,
});
export const loadingTopChartAtom = atom<boolean>({
  key: 'loadingTopChart',
  default: false,
});
export const queryAtom = atom<{ type: 'entries' | 'users'; q: string }>({
  key: 'query',
  default: {
    type: 'entries',
    q: '',
  },
});
export const entriesAtom = atom<Entry[]>({
  key: 'entries',
  default: [],
});
export const recentlyAddedAtom = atom<Entry[]>({
  key: 'recentlyAdded',
  default: [],
});

export const hasMoreRecentlyAddedAtom = atom<boolean>({
  key: 'hasMoreRecentlyAdded',
  default: true,
});

export const topChartAtom = atom<Entry[]>({
  key: 'topChart',
  default: [],
});

export const hasMoreTopChartAtom = atom<boolean>({
  key: 'hasMoreTopChart',
  default: true,
});

export const activeSearchAtom = selector<boolean>({
  key: 'activeSearch',
  get: ({ get }) => {
    const { q } = get(queryAtom);
    return !!q;
  },
});

export const usersAtom = atom<User[]>({
  key: 'users',
  default: [],
});
export const searchingUsersAtom = atom<boolean>({
  key: 'searchingUsers',
  default: false,
});
export const queryUsersAtom = atom<string>({
  key: 'queryUsers',
  default: '',
});

export const SearchStore = () => {
  const [entries, setEntries] = useRecoilState(entriesAtom);
  const [searching, setSearching] = useRecoilState(searchingAtom);
  const [topChart, setTopChart] = useRecoilState(topChartAtom);
  const [recentlyAdded, setRecentlyAdded] = useRecoilState(recentlyAddedAtom);

  const [loadingTopChart, setLoadingTopChart] = useRecoilState(
    loadingTopChartAtom
  );
  const [hasMoreTopChart, setHasMoreTopChart] = useRecoilState(
    hasMoreTopChartAtom
  );
  const [hasMoreRecentlyAdded, setHasMoreRecentlyAdded] = useRecoilState(
    hasMoreRecentlyAddedAtom
  );
  const [loadingRecentlyAdded, setLoadingRecentlyAdded] = useRecoilState(
    loadingRecentlyAddedAtom
  );

  const [users, setUsers] = useRecoilState(usersAtom);
  const [query, setQuery] = useRecoilState(queryAtom);
  const active = useRecoilValue(activeSearchAtom);

  const search = (query: string) => {
    setQuery((oldState) => ({ ...oldState, q: query }));
  };

  const updateSearchType = (type: 'entries' | 'users') => {
    setQuery((oldState) => ({ ...oldState, type }));
  };

  const searchUsers = (q: string) => {
    usersBackend.search(q).then((users) => {
      setUsers(users);
      setSearching(false);
    });
  };

  const searchEntries = (q: string) => {
    return entriesBackend.search(q).then((results) => {
      let entries: Entry[] = results.map((result: any) => new Entry(result));
      setEntries(entries);
      setSearching(false);
    });
  };

  const debouncedEntriesSearch = debounce(searchEntries, 400);
  const debouncedUsersSearch = debounce(searchUsers, 400);

  useEffect(() => {
    if (query.type === 'users') {
      debouncedUsersSearch(query.q);
    } else {
      debouncedEntriesSearch(query.q);
    }
  }, [query]);

  const getTopChart = () => {
    setLoadingTopChart(true);
    return entriesBackend.getTopChart().then((entries) => {
      setTopChart(entries);
      setLoadingTopChart(false);
    });
  };

  const loadMoreTopChart = (page: number) => {
    setLoadingTopChart(true);
    return entriesBackend.getTopChart(page).then((entries) => {
      if (entries.length == 0) {
        setHasMoreTopChart(false);
        setLoadingTopChart(false);
        return;
      }
      setTopChart([...topChart, ...entries]);
      setLoadingTopChart(false);
      return topChart;
    });
  };

  const getRecentlyAdded = () => {
    setLoadingRecentlyAdded(true);
    return entriesBackend.getRecentlyAdded().then((entries) => {
      setRecentlyAdded(entries);
      setLoadingRecentlyAdded(false);
      return recentlyAdded;
    });
  };

  const loadMoreRecentlyAdded = (page: number) => {
    setLoadingRecentlyAdded(true);
    return entriesBackend.getRecentlyAdded(page).then((entries) => {
      if (entries.length == 0) {
        setHasMoreRecentlyAdded(false);
        setLoadingRecentlyAdded(false);
        return;
      }
      setRecentlyAdded([...recentlyAdded, ...entries]);
      setLoadingRecentlyAdded(false);
      return recentlyAdded;
    });
  };

  return {
    searchEntries,
    getTopChart,
    loadMoreTopChart,
    getRecentlyAdded,
    loadMoreRecentlyAdded,
    entries,
    searching,
    topChart,
    recentlyAdded,
    loadingTopChart,
    hasMoreTopChart,
    hasMoreRecentlyAdded,
    loadingRecentlyAdded,
    users,
    query,
    searchUsers,
    updateSearchType,
    search,
    active,
  };
};
