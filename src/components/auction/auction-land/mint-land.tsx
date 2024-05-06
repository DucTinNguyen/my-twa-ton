import { toNano } from '@ton/core'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { walletContractAddress } from 'constant'
import useBidInfo from 'hooks/useBidInfo'
import TonWeb from 'tonweb'
import { mintType } from 'type/land-contract'

const MintLand = () => {
  const address = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  useBidInfo()
  const handleMintLand = async (params: mintType) => {
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

  return (
    <section className='w-full rounded-lg bg-white p-[16px] shadow-2xl'>
      <div className='flex items-center justify-between'>
        <button
          onClick={() => {
            handleMintLand({
              queryId: 0,
              amount: toNano(0.05)
            })
          }}
          className='my-6 w-full rounded-lg bg-stone-700 py-3 font-semibold text-white'
        >
          Mint
        </button>
      </div>
    </section>
  )
}

export default MintLand
