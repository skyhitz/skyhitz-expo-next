import { User, Entry } from '../models'
import { entriesBackend } from '../api/entries'
import { atom, useRecoilState } from 'recoil'

const profileUserAtom = atom<User | null>({
  key: 'profileUser',
  default: null,
})
const profileEntriesAtom = atom<Entry[]>({
  key: 'profileEntries',
  default: [],
})
const loadingEntriesAtom = atom<boolean>({
  key: 'loadingEntries',
  default: false,
})

export const ProfileStore = () => {
  const [user, setUser] = useRecoilState(profileUserAtom)
  const [profileEntries, setProfileEntries] = useRecoilState(profileEntriesAtom)
  const [loadingEntries, setLoadingEntries] = useRecoilState(loadingEntriesAtom)

  const getProfileInfo = async (user: User) => {
    if (!user) return
    setUser(user)
    return getUserEntries(user.id as string)
  }

  const getUserEntries = async (userId: string) => {
    setLoadingEntries(true)
    setProfileEntries([])
    const entries = await entriesBackend.getByUserId(userId)
    setLoadingEntries(false)
    return setProfileEntries(entries)
  }

  return {
    user,
    profileEntries,
    loadingEntries,
    getProfileInfo,
    getUserEntries,
  }
}

export default ProfileStore
