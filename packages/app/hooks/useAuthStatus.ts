import { useEffect, useState } from "react"
import { SecureStorage } from "app/utils/secure-storage"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_USER } from "app/api/user"
import { UserData } from "app/models"

type AuthStatus = {
    initialized: boolean,
    user?: UserData
}

export function useAuthStatus() {
  const [getUserLazy, { error, data }] = useLazyQuery(GET_USER)
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (data || error) {
        setInitialized(true)
    }
   
  }, [data, error])

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStorage.get("token")
      if (token) {
        // check if token is valid
        getUserLazy()
      } else {
        setInitialized(true)
      }
    }
    checkToken()
  }, [getUserLazy])

  return {
    initialized,
    user: data?.authenticatedUser
  }
}
