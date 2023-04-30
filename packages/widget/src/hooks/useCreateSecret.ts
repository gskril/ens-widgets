import { Address } from 'wagmi'
import { hash } from '@ensdomains/eth-ens-namehash'
import { useEffect, useState } from 'react'

/**
 * Create a random bytes32 value using the browser crypto API
 */
export const useCreateSecret = (trackingCode?: string): Address => {
  const [secret, setSecret] = useState<string | null>('0x')

  const baseHashFull = hash('enswidgets.eth')
  const baseHash = baseHashFull.slice(2, 10)

  const randomFallback = Math.random().toString(16)
  const appHashFull = hash(trackingCode || randomFallback)
  const appHash = appHashFull.slice(2, 10)

  const trackingHash = baseHash + appHash // 8 bytes, 16 chars

  useEffect(() => {
    const bytes = window.crypto.getRandomValues(new Uint8Array(32 - 8))
    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')

    setSecret('0x' + trackingHash + hex)
  }, [])
  return secret as `0x${string}`
}
