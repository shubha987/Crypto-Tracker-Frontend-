// src/components/WatchList.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const WatchList = ({ address }) => {
  const [tokens, setTokens] = useState([]);
  const [newToken, setNewToken] = useState('');
  const [balances, setBalances] = useState({});

  const addToken = () => {
    setTokens([...tokens, newToken]);
    setNewToken('');
  };

  useEffect(() => {
    const fetchBalances = async () => {
      const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
      const newBalances = {};
      for (const token of tokens) {
        const contract = new web3.eth.Contract(tokenAbi, token);
        const balance = await contract.methods.balanceOf(address).call();
        newBalances[token] = web3.utils.fromWei(balance, 'ether');
      }
      setBalances(newBalances);
    };
    if (address) {
      fetchBalances();
    }
  }, [address, tokens]);

  return (
    <div>
      <input type="text" value={newToken} onChange={(e) => setNewToken(e.target.value)} placeholder="Enter token address" />
      <button onClick={addToken}>Add Token</button>
      <ul>
        {tokens.map((token) => (
          <li key={token}>{token}: {balances[token] || 'Loading...'}</li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;