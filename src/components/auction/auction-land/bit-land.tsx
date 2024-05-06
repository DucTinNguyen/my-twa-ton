import { toNano } from '@ton/core'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { MAX_ROUND, walletContractAddress } from 'constant'
import useAuction from 'hooks/useAuction'
import useTotalBid from 'hooks/useBid'
import TonWeb from 'tonweb'
import Round from './round'
import { useAppSelector } from 'hooks/redux'
import { selectRound } from 'store/slice/land.slice'

const BidLand = () => {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()
  const { totalBid, totalSupply } = useTotalBid()
  const { auctionPrice } = useAuction()
  const roundBid = useAppSelector(selectRound)

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
      <main className='flex h-[380px] w-full items-center justify-center rounded-lg bg-white p-[16px] shadow-2xl'>
        {roundBid < MAX_ROUND ? (
          <main>
            <div className='flex justify-center gap-[30px]'>
              <div className='flex w-[146px] min-w-[146px] items-baseline gap-2 text-[25px]'>
                <span className='text-[rgb(179,74,17)]'>Sold:</span>
                <span className='w-[84px] min-w-[84px] font-bold text-[#523730]'>
                  {totalBid}/{totalSupply}
                </span>
              </div>
              <div className='flex items-baseline gap-2 text-[25px]'>
                <span className='text-[rgb(179,74,17)]'>Round:</span>
                <Round />
              </div>
              <div className='flex items-center gap-2 text-[25px]'>
                <span className='text-[rgb(179,74,17)]'>Price:</span>
                <span className='font-bold text-[#523730]'>
                  {auctionPrice} <span className='text-[18px] font-normal'>TON</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                handleBid()
              }}
              className='mx-auto my-6 block w-20 rounded-lg bg-stone-700 py-3 font-semibold text-white'
            >
              Bid
            </button>
          </main>
        ) : (
          <div>
            <p className='font-semibold'>Sold out</p>
          </div>
        )}
      </main>
    </>
  )
}

export default BidLand
