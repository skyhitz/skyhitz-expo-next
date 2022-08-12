import { ValidationResult } from 'app/features/accounts/validators'
import { useState } from 'react'

export function useValidation<T>(
  initialState: T,
  validationFunction: (val: T) => ValidationResult
) {
  const [state, setState] = useState(initialState)
  const [firstChangeLatch, setFirstChangeLatch] = useState(false)
  const validationResult = validationFunction(state)
  const setStateWithLatch = (s: T) => {
    setFirstChangeLatch(true)
    setState(s)
  }

  return {
    state,
    setState: setStateWithLatch,
    ...validationResult,
    firstChangeLatch,
  }
}
