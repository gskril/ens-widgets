declare module 'eth-ens-namehash' {
  export function normalize(name: string): string
  export function hash(name: string): `0x${string}`
}
