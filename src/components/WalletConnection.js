// src/components/WalletConnection.js
import React, { useState } from 'react';
import Web3 from 'web3';

const WalletConnection = ({ setAddress }) => {
  const [inputAddress, setInputAddress] = useState('');

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("MetaMask not detected");
    }
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(inputAddress);
  };

  return (
    <div>
      <button onClick={connectMetaMask}>Connect MetaMask</button>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputAddress} onChange={handleInputChange} placeholder="Enter wallet address" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WalletConnection;