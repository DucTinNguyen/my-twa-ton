import { useTonConnectUI } from "@tonconnect/ui-react"

const BtnBid = () => {

  const [tonConnectUI] = useTonConnectUI();

  const handleBid = () => {

    const message = [
      {
        address: 'kQApFtSIC4zxh4IydCRHma7URhg3HFE05tOnUwPcLtYZ-j9U',
        amount: String(0.1 * 10000000),
        // payload: 
      }
    ]

    tonConnectUI.sendTransaction({
      messages: message,
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
    })


  }




  return (
    <button onClick={handleBid}>BtnBid</button>
  )
}

export default BtnBid