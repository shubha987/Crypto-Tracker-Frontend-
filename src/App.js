import React, { useState } from 'react';
import './App.css';
import WalletConnection from './components/WalletConnection';
import AllowanceChecker from './components/AllowanceChecker';
import WatchList from './components/WatchList';

function App() {
  const [address, setAddress] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Token Tracker</h1>
        <WalletConnection setAddress={setAddress} />
        {address && (
          <>
            <AllowanceChecker address={address} />
            <WatchList address={address} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;