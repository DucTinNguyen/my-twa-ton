import { TonConnectButton } from '@tonconnect/ui-react';
import '@twa-dev/sdk';
import './App.css';
import LandInfo from './components/land-info';
import BtnBid from './components/btn-bid';

function App() {

  return (
    <div>
        <TonConnectButton />
        <LandInfo />
        <BtnBid />
    </div>
  )
}

export default App
