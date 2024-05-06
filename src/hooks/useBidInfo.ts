import { useCallback, useEffect } from 'react'
import { useTonClient } from './useTonClient'
import { Address, Dictionary } from '@ton/core'
import { walletContractAddress } from 'constant'

const useBidInfo = () => {
  const client = useTonClient()
  const getPriceAuction = useCallback(async () => {
    if (!client) return
    const result = await client.runMethod(Address.parse(walletContractAddress), 'bid_params')
    // console.log(result)
    const dict = (result.stack as any).items[1].cell
      .beginParse()
      .loadDictDirect(Dictionary.Keys.Uint(16), Dictionary.Values.Cell())
    //   .loadDictDirect(Dictionary.Keys.Uint(256), Dictionary.Values.Cell())
    console.log(dict)
    return
  }, [client])

  useEffect(() => {
    getPriceAuction()
  }, [getPriceAuction])
}

export default useBidInfo
