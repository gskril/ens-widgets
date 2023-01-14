import { useEffect, useState } from 'react'

/**
 * Create a random bytes32 value using the browser crypto API
 */
export const useCreateSecret = (): `0x${string}` => {
  const [secret, setSecret] = useState<string | null>('0x')

  useEffect(() => {
    const bytes = window.crypto.getRandomValues(new Uint8Array(32))
    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')

    setSecret('0x' + hex)
  }, [])
  return secret as `0x${string}`
}
