import { atom, selector, DefaultValue } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { client } from '../api/client'
import { userDataKey } from 'app/constants/constants'
import { User } from 'app/models/user'
import { ProfileEdit } from 'app/models/profile'

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    console.log('localstorage effect')
    setSelf(
      AsyncStorage.getItem(key).then((savedValue) =>
        savedValue != null ? JSON.parse(savedValue) : new DefaultValue()
      )
    )

    onSet((newValue, _, isReset) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue))
    })
  }

const headersEffect =
  () =>
  ({ setSelf, onSet }) => {
    onSet((newValue, _, isReset) => {
      isReset
        ? client.setHeader('authorization', '')
        : client.setHeader('authorization', `Bearer ${newValue.jwt}`)
    })
  }

export const userAtom = atom<null | User>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [localStorageEffect(userDataKey), headersEffect()],
})

export const profileAtom = atom<ProfileEdit>({
  key: 'profileEdit',
  default: selector({
    key: 'userSelect',
    get: ({ get }) => {
      const user = get(userAtom)
      if (!user)
        return {
          avatarUrl: '',
          displayName: '',
          description: '',
          username: '',
          email: '',
          loadingAvatar: false,
          uploadError: '',
        }
      const { avatarUrl, displayName, description, username, email } =
        user as unknown as ProfileEdit
      return {
        avatarUrl,
        displayName,
        description,
        username,
        email,
        loadingAvatar: false,
        uploadError: '',
      }
    },
  }),
})

export const profileValidationErrorAtom = selector<string | null>({
  key: 'profileValidationError',
  get: ({ get }) => {
    const { avatarUrl, displayName, description, username, email } =
      get(profileAtom)
    if (!avatarUrl) {
      return 'Upload a profile picture.'
    }

    if (!displayName) {
      return 'Add a display name.'
    }

    if (!description) {
      return 'Add a description.'
    }

    if (!username) {
      return 'Add a username.'
    }

    if (!email) {
      return 'Add an email.'
    }
    return null
  },
})

export const canUpdateProfileAtom = selector<boolean>({
  key: 'canUpdateProfile',
  get: ({ get }) => {
    const { avatarUrl, displayName, description, username, email } =
      get(profileAtom)
    return (
      !!avatarUrl && !!displayName && !!description && !!username && !!email
    )
  },
})

export const usernameValidationErrorAtom = atom({
  key: 'usernameValidationError',
  default: '',
})

export const displayNameValidationErrorAtom = atom({
  key: 'displayNameValidationError',
  default: '',
})

export const emailValidationErrorAtom = atom({
  key: 'emailValidationError',
  default: '',
})

export const usernameOrEmailValidationErrorAtom = atom({
  key: 'usernameOrEmailValidationError',
  default: '',
})

export const usernameOrEmailBackendErrorAtom = atom({
  key: 'usernameOrEmailBackendError',
  default: '',
})

export const signUpBackendErrorAtom = atom({
  key: 'signUpBackendError',
  default: '',
})

export const usernameOrEmailErrorAtom = selector<string>({
  key: 'usernameOrEmailError',
  get: ({ get }) => {
    const usernameOrEmailBackendError = get(usernameOrEmailBackendErrorAtom)
    const usernameOrEmailValidationError = get(
      usernameOrEmailValidationErrorAtom
    )

    if (usernameOrEmailValidationError) {
      return usernameOrEmailValidationError
    }

    if (usernameOrEmailBackendError) {
      return usernameOrEmailBackendError
    }

    return ''
  },
})

export const usernameOrEmailValidAtom = selector<boolean>({
  key: 'usernameOrEmailValid',
  get: ({ get }) => {
    const usernameOrEmailError = get(usernameOrEmailValidationErrorAtom)

    if (usernameOrEmailError) {
      return false
    }

    return true
  },
})

export const signUpValidAtom = selector<boolean>({
  key: 'signUpValid',
  get: ({ get }) => {
    const usernameValid = get(usernameValidationErrorAtom)
    const displayNameValid = get(displayNameValidationErrorAtom)
    const emailValid = get(emailValidationErrorAtom)

    if (usernameValid) {
      return false
    }
    if (displayNameValid) {
      return false
    }
    if (emailValid) {
      return false
    }

    return true
  },
})

export const signUpErrorAtom = selector<string>({
  key: 'signUpError',
  get: ({ get }) => {
    const usernameValidationError = get(usernameValidationErrorAtom)
    const displayNameValidationError = get(displayNameValidationErrorAtom)
    const emailValidationError = get(emailValidationErrorAtom)
    const signUpBackendError = get(signUpBackendErrorAtom)

    if (usernameValidationError) {
      return usernameValidationError
    }

    if (displayNameValidationError) {
      return displayNameValidationError
    }

    if (emailValidationError) {
      return emailValidationError
    }

    if (signUpBackendError) {
      return signUpBackendError
    }

    return ''
  },
})
