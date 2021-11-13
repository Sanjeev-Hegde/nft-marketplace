import { useEffect, useState } from 'react';
import Web3 from 'web3';
import web3Modal from './common/web3modal';
import './App.css';
import NFT, { Collection, Item } from "./nft/nft"

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [accounts, setAccounts] = useState<string[]>();
  const [selectedAccount, setAccount] = useState<string>();
  const [networkId, setNetwrkId] = useState<number>(-1);
  const [walletConnectionFailed, setWalletConnectionFailed] = useState(false);
  const networks:Record<number,string> = { 1: "Mainnet", 3: "Ropsten", 4: "Rinkeby", 5: "Goerli" };
  const [contractAddress, setContractAddress] = useState<string>();
  async function connectWallet() {
    const provider = await web3Modal.connect();
      let web3 = new Web3(provider);
      setWeb3(web3);
      web3.eth.getAccounts().then(accounts=>{
        console.log(accounts)
        setAccounts(accounts);
        setAccount(accounts[0]);
      }); 
      provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log(error);
      });
      provider.on("accountsChanged", (accounts: string[]) => {
        setAccounts(accounts);
        setAccount(accounts[0]);
        console.log(accounts);
      });
      provider.on("chainChanged", (chainId: number) => {
        console.log(chainId);
      });
  }

  function deployCollection() {  
    // deploy only if we have valid account selected
    // TODO: verify whether account address is valid
    if(web3 && selectedAccount){  
      let collection:Collection = {
        web3:web3,
        name:"NFT2021",
        symbol:"NNFT",
        account:selectedAccount
      }
      NFT.createCollection(collection).then(res => {
        //console.log(res);    
        console.log(res.contractAddress);
        setContractAddress(res.contractAddress);
      }).catch(err => {
        console.log(err);
      })
    }
  }

  function addItem() {
    if(web3 && selectedAccount && contractAddress){
      let item:Item = {
        web3:web3,
        account: selectedAccount,
        contractAddress:contractAddress,
        ipfsHash: "QmQxVsopX1ug14eNzDkFCTYo7XLmWuyn1h8GGVVAvUPdui"
      }
      NFT.addItem(item).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
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
