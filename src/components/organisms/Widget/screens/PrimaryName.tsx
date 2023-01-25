import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import React from 'react'

import { Button } from '../styles'
import {
  getReverseRegistrarAddress,
  REVERSE_REGISTRAR_ABI,
} from '../../../../contracts'
import { Header } from '../../Header'

interface PrimaryNameProps {
  name: string
  setIsPrimaryNameSet: React.Dispatch<React.SetStateAction<boolean>>
}

export const PrimaryName = ({
  name,
  setIsPrimaryNameSet,
}: PrimaryNameProps) => {
  name = 'gregskril.eth'
  return <p>{name}</p>
}
