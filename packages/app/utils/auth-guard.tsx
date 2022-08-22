import { useEffect } from "react"
import { useRecoilValue } from "recoil"
import { userAtom } from "app/state/atoms"
import { useRouter } from "solito/router"

export function AuthGuard({ children }: { children: JSX.Element }) {
  const user = useRecoilValue(userAtom)
  const { push } = useRouter()

  useEffect(() => {
    if (!user) {
      push("/")
    }
  }, [user, push])

  // if auth with a valid user show protected page
  if (user) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return null
}
