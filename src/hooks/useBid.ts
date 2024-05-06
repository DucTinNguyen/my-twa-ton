import { Address } from '@ton/core'
import { walletContractAddress } from 'constant'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTonClient } from './useTonClient'

const useTotalBid = () => {
  const client = useTonClient()
  const [bid, setBid] = useState({
    totalBid: 0,
    totalSupply: 0
  })

  const getTotalBid = useCallback(async () => {
    if (!client) return
    const result = await client.runMethod(Address.parse(walletContractAddress), 'get_nft_total_bid')
    const result1 = await client.runMethod(Address.parse(walletContractAddress), 'get_nft_total_supply')
    setBid({
      ...bid,
      totalBid: Number((result.stack as any).items[0].value),
      totalSupply: Number((result1.stack as any).items[0].value)
    })
    return
  }, [client])

  useEffect(() => {
    getTotalBid()
  }, [client])
  return useMemo(() => {
    return {
      ...bid
    }
  }, [bid])
}

export default useTotalBid
