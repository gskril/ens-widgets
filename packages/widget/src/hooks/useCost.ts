import { BigNumber, utils } from 'ethers'
import { parseDuration, parseName } from '../utils'
import {
  REGISTRAR_ABI,
  REGISTRAR_ADDRESS,
  TOTAL_GAS_AMOUNT,
} from '../contracts'
import { useContractRead } from 'wagmi'
import { useFetch } from './useFetch'

interface Cost {
  name: string
  duration: string
  isConnected: boolean
}

interface CostReturn {
  rentEth: string | null
  cost: string | null
  isLoading: boolean
  isError: boolean
}

export const useCost = ({
  name: _name,
  duration,
  isConnected,
}: Cost): CostReturn => {
  const enabled = isConnected && _name && duration ? true : false

  const { data: gasbest } = useFetch<any>(
    enabled ? 'https://gas.best/stats' : undefined
  )

  const gasPrice = gasbest ? (gasbest.pending.fee as number) : null
  const ethPrice = gasbest ? (gasbest.ethPrice as number) : null

  const name = parseName(_name)
  const seconds = parseDuration(duration)

  const { data: rentPrice, isError: isRentPriceError } = useContractRead({
    abi: REGISTRAR_ABI,
    address: REGISTRAR_ADDRESS,
    functionName: 'rentPrice',
    args: [name, seconds as unknown as BigNumber],
    enabled,
  })

  const rentPriceInEth = rentPrice ? utils.formatEther(rentPrice) : null
  const gasCostInGwei = gasPrice ? gasPrice * TOTAL_GAS_AMOUNT : null
  const gasCostInEth = gasCostInGwei ? gasCostInGwei / 1e9 : null
  const finalCostEth = Number(rentPriceInEth) + Number(gasCostInEth)
  const finalCostUSD = ethPrice ? (finalCostEth * ethPrice).toFixed(2) : null

  return {
    rentEth: rentPriceInEth,
    cost: finalCostUSD ? `$${finalCostUSD.toString()}` : null,
    isLoading:
      enabled &&
      !isRentPriceError &&
      (!rentPriceInEth || !gasCostInEth || !finalCostEth),
    isError: isRentPriceError,
  }
}
