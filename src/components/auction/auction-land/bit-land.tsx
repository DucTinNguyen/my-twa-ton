import { toNano } from '@ton/core'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { walletContractAddress } from 'constant'
import useAuction from 'hooks/useAuction'
import useTotalBid from 'hooks/useBid'
import TonWeb from 'tonweb'

const BidLand = () => {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()
  const { totalBid, totalSupply } = useTotalBid()
  const { auctionPrice } = useAuction()
  const handleBid = async () => {
    let a = new TonWeb.boc.Cell()
    a.bits.writeUint(5, 32)
    a.bits.writeUint(0, 64) // 0 is hard code <<---->> params.queryId
    a.bits.writeAddress(new TonWeb.utils.Address(address))
    a.bits.writeCoins(toNano(Number(0.05))) // 0.05 is hard code <<---->> aution price at current round

    const result = await a.toBoc()
    const payload = TonWeb.utils.bytesToBase64(result)

    const message = [
      {
        address: walletContractAddress,
        amount: String(toNano(Number(0.05))),
        payload
      }
    ]

    tonConnectUI.sendTransaction({
      messages: message,
      validUntil: Date.now() + 5 * 60 * 1000 // 5 minutes for user to approve
    })
  }

  return (
    <>
      <section className='rounded-lg bg-white p-2 shadow-2xl'>
        <div className='flex justify-center gap-[30px]'>
          <div className='flex items-baseline gap-2 text-[25px]'>
            <span className='text-[rgb(179,74,17)]'>Sold:</span>
            <span className='font-bold text-[#523730]'>
              {totalBid}/{totalSupply}
            </span>
          </div>
          <div className='flex items-baseline gap-2 text-[25px]'>
            <span className='text-[rgb(179,74,17)]'>Round:</span>
            <span className='font-bold text-[#523730]'>{30}</span>
          </div>
          <div className='flex items-baseline gap-2 text-[25px]'>
            <span className='text-[rgb(179,74,17)]'>Price:</span>
            <span className='font-bold text-[#523730]'>
              {auctionPrice} <span className='text-[18px] font-normal'>TON</span>
            </span>
          </div>
        </div>
      </section>

      <section className='w-full rounded-lg bg-white p-[16px] shadow-2xl'>
        <button
          onClick={() => {
            handleBid()
          }}
          className='mx-auto my-6 block w-20 rounded-lg bg-stone-700 py-3 font-semibold text-white'
        >
          Bid
        </button>
      </section>
    </>
  )
}

export default BidLand
