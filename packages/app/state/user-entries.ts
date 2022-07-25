import { entriesBackend } from '../api/entries'
import { Entry } from '../models'
import { userAtom } from '../state/atoms'
import { useRecoilValue } from 'recoil'

export const UserEntriesStore = () => {
  const user = useRecoilValue(userAtom)

  let entries: Entry[] = []
  let loading: boolean = false

  const refreshEntries = async () => {
    if (!user) {
      return
    }
    if (!user.id) {
      return
    }
    loading = true

    const res = await entriesBackend.getByUserId(user.id)
    loading = false
    entries = res ? res : []
  }
  return { entries, loading, refreshEntries }
}
