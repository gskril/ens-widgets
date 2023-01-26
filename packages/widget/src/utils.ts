import { Address, Chain } from 'wagmi'
import { SECONDS_PER_YEAR } from './contracts'
import { SendTransactionResult } from '@wagmi/core'

/**
 * Parses a string of years and returns a string of seconds
 * @param duration string of years to register for e.g. '1 year'
 * @returns string of seconds to register for e.g. '31556952'
 */
export const parseDuration = (duration: string): string => {
  const [yearsStr] = duration.split(' ')
  const years = parseFloat(yearsStr)
  const seconds = years * SECONDS_PER_YEAR
  return seconds.toString()
}

/**
 * Parses a name and returns a string of the name without the .eth suffix
 * @param name ENS name with or without .eth suffix e.g. 'wagmi.eth' or 'wagmi'
 * @returns string of name without .eth suffix e.g. 'wagmi'
 */
export const parseName = (name: string): string => {
  return name.endsWith('.eth') ? name.split('.')[0] : name
}

export const getEtherscanLink = (
  tx: SendTransactionResult | Address | undefined,
  chain: Chain | undefined
) => {
  const hash = typeof tx === 'string' ? tx : tx?.hash

  return `https://${chain?.id === 5 ? 'goerli.' : ''}etherscan.io/tx/${hash}`
}

export const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
