// specify custom types for modules without types

declare module '@ensdomains/eth-ens-namehash' {
  export function hash(name: string): string
  export function normalize(name: string): string
}
