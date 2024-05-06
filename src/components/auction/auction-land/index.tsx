import { startTransition, useState, useTransition } from 'react'
import BidLand from './bit-land'
import MintLand from './mint-land'

const tabs = [
  {
    id: 0,
    title: 'Auction Information',
    component: <BidLand />
  },
  {
    id: 1,
    title: 'Your land',
    component: <MintLand />
  }
]

const AuctionLand = () => {
  const [tab, setTab] = useState(0)
  const [isTransaction, startTransition] = useTransition()

  const handleSetTab = (index: number) => {
    startTransition(() => {
      setTab(index)
    })
  }

  return (
    <main className='grow'>
      <p className='flex items-center justify-between'>
        <span className='text-[32px] font-bold uppercase text-[rgb(82,55,48)]'>land auction</span>
        <span className='text-[20px] font-semibold text-[rgb(179,74,17)]'>Auction Rule</span>
      </p>
      <section className='mt-4 flex flex-col gap-4'>
        <ul className='flex items-center space-x-4'>
          {tabs.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleSetTab(item.id)
                }}
                className={`${tab === item.id ? ' border-[#b34a11]  text-[#b34a11]' : ''} cursor-pointer border-b-[1px] py-2  font-semibold`}
              >
                {item.title}
              </li>
            )
          })}
        </ul>
        {tabs[tab].component}
      </section>
    </main>
  )
}

export default AuctionLand
