import { MAX_ROUND } from 'constant'
import { useAppDispatch } from 'hooks/redux'
import React, { useEffect, useState } from 'react'
import { incrementRound } from 'store/slice/land.slice'

const Round = () => {
  const [round, setRound] = useState(Number(window.localStorage.getItem('round')) || 1)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const interval = setInterval(() => {
      setRound((round) => round + 1)
    }, 60 * 1000)
    window.localStorage.setItem('round', round.toString())
    dispatch(incrementRound(Number(window.localStorage.getItem('round'))))
    if (round >= MAX_ROUND) {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [round])

  return <span className='font-bold text-[#523730]'>{round}</span>
}

export default Round
