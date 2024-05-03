import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import TonWeb from "tonweb";

const BtnBid = () => {

  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const handleBid = async () => {

    let a = new TonWeb.boc.Cell();
    a.bits.writeUint(5,32);
    a.bits.writeUint(0,64);
    a.bits.writeAddress(new TonWeb.utils.Address(address));
    a.bits.writeCoins(0.05* 1000000000);

    const result = await a.toBoc();
    const payload = TonWeb.utils.bytesToBase64(result); 
    
    const message = [
      {
        address: 'kQApFtSIC4zxh4IydCRHma7URhg3HFE05tOnUwPcLtYZ-j9U',
        amount: String(0.05 * 1000000000),
        payload
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