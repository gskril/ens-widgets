import { useEffect, useState } from 'react'
import { createSecret } from '../utils'

export const useCreateSecret = (): `0x${string}` => {
  const [secret, setSecret] = useState<string | null>('0x')

  useEffect(() => setSecret(createSecret()), [])
  return secret as `0x${string}`
}
