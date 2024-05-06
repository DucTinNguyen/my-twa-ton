import { Address, Builder, Cell, Dictionary, Slice } from '@ton/core'
import { walletContractAddress } from 'constant'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DictionaryBids } from 'type/land-contract'
import { useTonClient } from './useTonClient'

interface NFTDictValue {
  // content: Buffer
  address: Address
  price: BigInt
}

const useBidInfo = () => {
  const client = useTonClient()
  const [listBids, setListBids] = useState<DictionaryBids[]>([])
  const NFTDictValueSerializer = {
    serialize(src: NFTDictValue, builder: Builder) {},
    parse(src: Slice): NFTDictValue {
      return {
        address: src.loadAddress(),
        price: src.loadCoins()
      }
    }
  }

  const getPriceAuction = useCallback(async () => {
    if (!client) return
    const result = await client.runMethod(Address.parse(walletContractAddress), 'bid_params')
    const dataCell = (result.stack as any).items[1].cell as Cell
    const data = dataCell.asSlice()
    const dict = data.loadDictDirect(Dictionary.Keys.BigUint(256), NFTDictValueSerializer)

    let list = []
    for (let i = 0; i < dict.size; i++) {
      list.push({
        address: dict.get(BigInt(i + 1))?.address.toString(),
        price: Number(dict.get(BigInt(i + 1))?.price)
      })
    }
    setListBids(list)
  }, [client])

  useEffect(() => {
    getPriceAuction()
  }, [getPriceAuction])

  return {
    list: useMemo(() => {
      return listBids
    }, [listBids])
  }
}

export default useBidInfo
