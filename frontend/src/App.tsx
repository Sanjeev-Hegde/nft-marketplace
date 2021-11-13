import { useEffect, useState } from 'react';
import Web3 from 'web3';
import web3Modal from './common/web3modal';
import './App.css';
import NFT, { Collection, Item } from "./nft/nft"

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [accounts, setAccounts] = useState<string[]>();
  const [defaultAccount, setDefaultAccount] = useState<string>();
  const [networkId, setNetwrkId] = useState<number>(-1);
  const networks: Record<number, string> = { 1: "Mainnet", 3: "Ropsten", 4: "Rinkeby", 5: "Goerli" };
  const [contractAddress, setContractAddress] = useState<string>();
  async function connectWallet() {
    if(web3) {
      setDefaultAccount(undefined);
      setWeb3(undefined);
    }
    else{
      const provider = await web3Modal.connect();
      let web3 = new Web3(provider);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      // const chainId = await web3.eth.getChainId();
      setNetwrkId(networkId);
      setAccounts(accounts);
      setDefaultAccount(accounts[0]);
      provider.on("disconnect", (error: { code: number; message: string }) => {
        console.log(error);
        setWeb3(undefined);
      });
      provider.on("accountsChanged", (accounts: string[]) => {
        setAccounts(accounts);
        setDefaultAccount(accounts[0]);
        console.log(accounts);
      });
      provider.on("networkChanged", (networkId: number) => {
        console.log(networkId);
        setNetwrkId(networkId);
      });
    }
  }

  function deployCollection() {
    // deploy only if we have valid account selected
    // TODO: verify whether account address is valid
    if (web3 && defaultAccount) {
      let collection: Collection = {
        web3: web3,
        name: "NFT2021",
        symbol: "NNFT",
        account: defaultAccount
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
    if (web3 && defaultAccount && contractAddress) {
      let item: Item = {
        web3: web3,
        account: defaultAccount,
        contractAddress: contractAddress,
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
      <div className="row">
        <div className="col-md-2" style={{paddingLeft:"20px"}}>
          <img src={require('./assets/marketplace_icon.png').default} style={{width:130,height:100,float:'left'}}></img>
        </div>
        <div className="col-md-8" >
          <div style={{ height: "100%",textAlign:"center",display:"table", width:"100%"}}>
            <h1 style={{color:'#396669',display:"table-cell",verticalAlign:"middle"}}>P2P NFT Marketplace</h1>
          </div>          
        </div>
        <div className="col-md-2" style={{display: "grid", textAlign:"center"}}>
          <div style={{alignSelf:"center"}}>
            <img src={require('./assets/wallet.png').default} style={{width:50,height:50, cursor: 'pointer' }} onClick={connectWallet} ></img>
            <h6>{defaultAccount?"Connected":"Not Connected"}</h6>
          </div>          
        </div>               
      </div>
      <div style={{border:"1px solid",backgroundColor :"#396669",opacity:"7%"}}/>
      <header className="App-header">
        <div style={{margin:"30px"}}>
          {web3 ?
            <div>
              {!defaultAccount ?
                <div>
                  <h2>Failed To Connect to Wallet</h2>
                </div>
                :
                <div>
                  <h3>Connected To Wallet Successfully</h3>
                  <span>Network: {networks[networkId] ?? "Custom Network"}</span><br />
                  <span>Wallet Accounts: {accounts}</span>
                  <br /><br />
                  {!contractAddress ?
                    <div>
                      <button className="btn btn-info" onClick={deployCollection}>Deploy New Collection</button><br /><br />
                    </div>
                    :
                    <div>
                      <br /><br />
                      <h3>Collection Created Successfully</h3>
                      <span>Collection Address: {contractAddress}</span><br /><br />
                      <button className="btn btn-info" onClick={addItem}>Add Item</button>
                    </div>
                  }
                </div>
              }
            </div>
            :
            <div style={{textAlign:"center"}}>
              <h2>Connect Your Wallet to Proceed</h2>
              <img src={require('./assets/wallet.png').default} style={{ width: "200px", height: "200px", cursor: 'pointer' }} onClick={connectWallet}></img>
            </div>
          }
        </div>
      </header>
    </div>
  );
}


export default App;
