import { Address } from 'wagmi'
import { useEffect, useState } from 'react'

/**
 * Create a random bytes32 value using the browser crypto API
 */
export const useCreateSecret = (trackingCode?: string): Address => {
  const [secret, setSecret] = useState<string | null>('0x')

  const baseHex = utf8ToHex('widget--')
  const baseBytes = baseHex.length / 2

  const trackingHex = utf8ToHex(trackingCode || '')
  const trackingBytes = trackingHex.length / 2

  const totalHex = baseHex + trackingHex
  const totalBytes = baseBytes + trackingBytes

  // Reserve a minimum of 8 bytes for the random secret
  if (trackingBytes < 4 || totalBytes > 24) {
    throw new Error('Tracking code must be between 4 and 16 bytes')
  }

  console.log(totalHex)

  useEffect(() => {
    const bytes = window.crypto.getRandomValues(new Uint8Array(32 - totalBytes))
    const hex = Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')

    setSecret('0x' + totalHex + hex)
  }, [])
  return secret as `0x${string}`
}

const utf8ToHex = (str: string) => Buffer.from(str, 'utf8').toString('hex')
