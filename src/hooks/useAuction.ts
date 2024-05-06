import { Address, fromNano } from '@ton/core'
import { walletContractAddress } from 'constant'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTonClient } from './useTonClient'

const useAuction = () => {
  const client = useTonClient()
  const [auctionPrice, setAuctionPrice] = useState('0')

  const getPriceAuction = useCallback(async () => {
    if (!client) return
    const result = await client.runMethod(Address.parse(walletContractAddress), 'get_auction_price')
    setAuctionPrice(fromNano((result.stack as any).items[0].value).toString())
    return
  }, [client])

  useEffect(() => {
    getPriceAuction()
  }, [getPriceAuction])

  return useMemo(() => {
    return {
      auctionPrice
    }
  }, [auctionPrice])
}

export default useAuction
