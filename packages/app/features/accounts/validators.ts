export type ValidationResult = {
  isValid: boolean
  errorMsg?: string
}

export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, errorMsg: 'Username is required.' }
  }

  if (username.length < 2) {
    return { isValid: false, errorMsg: 'Username is minimum 2 characters.' }
  }

  let validRegex = /^[a-zA-Z0-9_-]+$/.test(username)
  if (!validRegex) {
    return {
      isValid: false,
      errorMsg: 'Usernames cannot have spaces or special characters.',
    }
  }

  return { isValid: true }
}

export function validateDisplayName(displayName: string): ValidationResult {
  if (!displayName) {
    return {
      isValid: false,
      errorMsg: 'Display name is required.',
    }
  }

  if (displayName.length < 2) {
    return {
      isValid: false,
      errorMsg: 'Display name is minimum 2 characters.',
    }
  }

  return { isValid: true }
}
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return {
      isValid: false,
      errorMsg: 'Email is required.',
    }
  }

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(email)) {
    return {
      isValid: false,
      errorMsg: 'Please enter a valid email.',
    }
  }

  return { isValid: true }
}
