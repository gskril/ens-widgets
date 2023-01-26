import { normalize } from 'eth-ens-namehash'

export const useNormalizeName = (name: string) => {
  if (!name) return undefined

  try {
    return name === normalize(name)
  } catch {
    return false
  }
}
