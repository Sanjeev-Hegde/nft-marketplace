import './App.css';
import getWeb3 from "./getWeb3";
import React, { useState } from 'react';
import NFT from "./NFT.js"
function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [networkId, setNetwrkId] = useState();
  const [walletConnectionFailed, setWalletConnectionFailed] = useState(false);
  const networks = { 1: "Mainnet", 3: "Ropsten", 4: "Rinkeby", 5: "Goerli" };
  const [contractAddress, setContractAddress] = useState();
  function connectWallet() {
    getWeb3().then(web3 => {
      // Use web3 to get the user's accounts.
      setWeb3(web3);
      web3.eth.getAccounts().then(accounts => {
        setAccounts(accounts);
      });
      web3.eth.net.getId().then(networkId => {
        setNetwrkId(networkId);
      });
    }).catch(error => {
      // Catch any errors for any of the above operations.
      setWalletConnectionFailed(true);
      console.error(error);
    });
  }

  function deployCollection() {
    // Collection Name and Symbol
    NFT.createCollection(web3, "NFT2021", "NNFT", accounts[0]).then(res => {
      //console.log(res);    
      console.log(res.contractAddress);
      setContractAddress(res.contractAddress);
    }).catch(err => {
      console.log(err);
    })
  }

  function addItem() {
    console.log("address:"+contractAddress);
    NFT.addItem(web3, accounts[0], contractAddress, "QmQxVsopX1ug14eNzDkFCTYo7XLmWuyn1h8GGVVAvUPdui").then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {web3 ?
            <div>
              {walletConnectionFailed ?
                <div>
                  <h2>Failed To Connect to Wallet</h2>
                </div>
                :
                <div>
                  <h1>Connected To metamask Successfully</h1>
                  <span>Network: {networks[networkId] ?? "Custom Network"}</span><br />
                  <span>Wallet Accounts: {accounts}</span>
                  <br /><br />
                  {!contractAddress ?
                    <div>
                      <button className="btn btn-info" onClick={deployCollection}>Deploy New Collection</button><br /><br />
                    </div>
                    :
                    <div>
                         <br/><br/>
                         <h3>Collection Created Successfully</h3>
                         <span>Collection Address: {contractAddress}</span><br/><br/>
                         <button className="btn btn-info" onClick={addItem}>Add Item</button>
                    </div>
                  }                 
                </div>
              }
            </div>
            :
            <div>
              <h2>Select Your Wallet</h2>
              <img src={require('./assets/metamask.png').default} style={{ width: "200px", height: "200px", cursor: 'pointer' }} onClick={connectWallet}></img>
            </div>
          }
        </div>
      </header>
    </div>
  );
}

export default App;
