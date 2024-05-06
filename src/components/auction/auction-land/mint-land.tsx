import { Address, fromNano, toNano } from '@ton/core'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { walletContractAddress } from 'constant'
import useBidInfo from 'hooks/useBidInfo'
import useFeeDeploy from 'hooks/useFeeDeploy'
import { formatToHexAddress, shortenAddress } from 'lib'
import toast from 'react-hot-toast'
import TonWeb from 'tonweb'
import { mintType } from 'type/land-contract'

const MintLand = () => {
  const address = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const { list } = useBidInfo()
  const { fee } = useFeeDeploy()
  const filterMyBids = () => {
    return list?.filter((item) => formatToHexAddress(String(item?.address)) === formatToHexAddress(address))
  }

  console.log(filterMyBids())
  const handleMintLand = async (params: mintType) => {
    if (!params.amount) {
      toast.error('You do not have enough to mint')
      return
    }

    let body = new TonWeb.boc.Cell()
    body.bits.writeUint(1, 32)
    body.bits.writeUint(params.queryId || 0, 64)
    body.bits.writeCoins(params.amount)
    body.bits.writeAddress(new TonWeb.utils.Address(address))
    const result = await body.toBoc()
    const payload = TonWeb.utils.bytesToBase64(result)

    const message = [
      {
        address: walletContractAddress,
        amount: String(params.amount),
        payload
      }
    ]
    try {
      await tonConnectUI.sendTransaction({
        messages: message,
        validUntil: Date.now() + 5 * 60 * 1000 // 5 minutes for user to approve
      })
    } catch (err) {
      console.log('--error: ', err)
    }
  }
  const myBids = []

  return (
    <section className='flex h-[380px] w-full items-center justify-center rounded-lg bg-white p-[16px] shadow-2xl'>
      {myBids.length > 0 ? (
        <section className='flex flex-col items-center justify-between'>
          <div className='grid max-h-[206px] w-full grid-cols-3 gap-4 overflow-y-auto'>
            {list.map((item, index) => {
              return (
                <div key={index} className='flex h-[60px] flex-col rounded border border-[#B34A11] p-1'>
                  <p className='flex justify-between'>
                    <span>Address:</span>
                    <span>{shortenAddress(item.address)}</span>
                  </p>
                  <p className='flex justify-between'>
                    <span>Price:</span>
                    <span>{fromNano(Number(item.price))} TON</span>
                  </p>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => {
              handleMintLand({
                queryId: 0,
                amount: toNano(Number(fee))
              })
            }}
            className='my-6 w-full rounded-lg bg-stone-700 py-3 font-semibold text-white'
          >
            Mint
          </button>
        </section>
      ) : (
        <div>
          <p className='text-center font-semibold'>No Land</p>
          <p className='font-semibold'>Get your land now!</p>
        </div>
      )}
    </section>
  )
}

export default MintLand
