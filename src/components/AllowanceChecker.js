// src/components/AllowanceChecker.js
import React, { useState } from 'react';
import Web3 from 'web3';

const AllowanceChecker = ({ address }) => {
  const [token, setToken] = useState('');
  const [spender, setSpender] = useState('');
  const [allowance, setAllowance] = useState(null);

  const checkAllowance = async () => {
    const web3 = new Web3('https://mainnet.infura.io/v3/41e6a538e10f4433b60c265dcb7e5f4a');
    const contract = new web3.eth.Contract(tokenAbi, token);
    const allowance = await contract.methods.allowance(address, spender).call();
    setAllowance(web3.utils.fromWei(allowance, 'ether'));
  };

  return (
    <div>
      <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token address" />
      <input type="text" value={spender} onChange={(e) => setSpender(e.target.value)} placeholder="Spender address" />
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance !== null && <p>Allowance: {allowance}</p>}
    </div>
  );
};

export default AllowanceChecker;