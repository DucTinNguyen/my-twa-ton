import AuctionLand from "components/auction/auction-land"
import Map from "components/auction/map"

const AuctionPage = () => {
  return (
    <main className="flex space-x-10 items-start">
      <Map />
      <AuctionLand />
    </main>
  )
}

export default AuctionPage