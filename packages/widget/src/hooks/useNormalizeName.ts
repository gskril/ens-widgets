import { ens_normalize as normalize } from '@adraffy/ens-normalize'
import React from 'react'
import { parseName } from '../utils'

interface UseNormalizeName {
  isNormalized: boolean
}

export const useNormalizeName = (
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>
): UseNormalizeName => {
  try {
    const normalizedName = normalize(name)

    if (parseName(normalizedName).includes('.')) {
      return {
        isNormalized: false,
      }
    } else {
      if (normalizedName !== name) {
        setName(normalizedName)
      }

      return {
        isNormalized: true,
      }
    }
  } catch {
    return {
      isNormalized: false,
    }
  }
}
