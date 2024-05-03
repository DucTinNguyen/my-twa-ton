import { TonConnectButton } from '@tonconnect/ui-react';
import './App.css';
import '@twa-dev/sdk';
import { useCounterContract } from './hooks/useCounterContract';

function App() {

  const {value, sendIncrement} = useCounterContract();

  return (
    <div>
        <TonConnectButton />
        <div className='Card'>
          <b>Counter Value</b>
          <div>{value ?? 'Loading...'}</div>
        </div>
        <button onClick={() => {
            sendIncrement();
          }}>Increment</button>
    </div>
  )
}

export default App
