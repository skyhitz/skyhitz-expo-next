import { atom, selector } from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userDataKey } from 'app/constants/constants'
import { User } from 'app/models/user'
import { ProfileEdit } from 'app/models/profile'


export const userAtom = atom<null | User>({
  key: 'user',
  default: null,
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

export const signUpBackendErrorAtom = atom({
  key: 'signUpBackendError',
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
