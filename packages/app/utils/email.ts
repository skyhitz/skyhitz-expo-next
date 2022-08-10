import { NativeModules, Platform } from 'react-native'
import * as Linking from 'expo-linking'

class EmailException extends Error {
  constructor(cause: string) {
    super(cause)
    this.name = 'EmailException'
  }
}

export async function openInboxAndroid(options: any = {}) {
  // We can't pre-choose, since we use native intents
  if (!('Email' in NativeModules)) {
    throw new EmailException(
      'NativeModules.Email does not exist. Check if you installed the Android dependencies correctly.'
    )
  }

  let text = options.removeText
    ? ''
    : options.title || 'What app would you like to open?'

  let newTask = true
  if ('newTask' in options) {
    newTask = Boolean(options.newTask)
  }

  return NativeModules.Email.open(text, newTask)
}

export function openEmail() {
  if (Platform.OS === 'web') {
    Linking.openURL('https://mail.google.com/mail/u/0/#inbox')
  } else if (Platform.OS === 'android') {
    openInboxAndroid()
  } else if (Platform.OS === 'ios') {
    openInboxAndroid()
  }
}
