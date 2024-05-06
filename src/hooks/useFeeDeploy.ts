import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTonClient } from './useTonClient'
import { Address, beginCell, fromNano } from '@ton/core'
import { walletContractAddress } from 'constant'
import { useTonAddress } from '@tonconnect/ui-react'

const useFeeDeploy = () => {
  const client = useTonClient()
  const address = useTonAddress()
  const [fee, setFee] = useState('0')

  const getFeeDeploy = useCallback(async () => {
    if (!client) return
    const result = await client.runMethod(Address.parse(walletContractAddress), 'get_nft_deploy_fee', [
      {
        type: 'slice',
        cell: beginCell().storeAddress(Address.parse(address)).endCell()
      }
    ])
    if (result) {
      setFee(Number(fromNano((result.stack as any).items[0].value)).toString())
    }
  }, [client])

  useEffect(() => {
    getFeeDeploy()
  }, [getFeeDeploy])
  return useMemo(() => {
    return {
      fee
    }
  }, [fee])
}

export default useFeeDeploy
