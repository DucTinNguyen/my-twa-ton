import { Address } from '@ton/core'
import TonWeb from 'tonweb'

export const shortenAddress = (address: string | undefined): string => {
  return address?.slice(0, 4) + '...' + address?.slice(-4)
}

export const formatToHexAddress = (address: string) => {
  if (!address) return
  return `0:${TonWeb.utils.bytesToHex(Address.parse(address).hash)}`.toLowerCase()
}
