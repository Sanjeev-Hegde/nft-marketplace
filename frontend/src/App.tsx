import { useEffect, useState } from 'react';
import Web3 from 'web3';
import web3Modal from './common/web3modal';
import './App.css';
import Profile from './routes/profile/Profile';
import { WalletDetails } from './models/WalletDetails';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  const [web3, setWeb3] = useState<Web3>();
  const [accounts, setAccounts] = useState<string[]>();
  const [walletDetails, setWalletDetails] = useState<WalletDetails>();
  const networks: Record<number, string> = { 1: "Mainnet", 3: "Ropsten", 4: "Rinkeby", 5: "Goerli" };
  const [contractAddress, setContractAddress] = useState<string>();
  async function initializeProvider() {
    const provider = await web3Modal.connect();
    let web3 = new Web3(provider);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.getChainId();
    let walletDetails: WalletDetails = {
      web3: web3,
      defaultAccount: accounts[0],
      chainId: chainId,
      networkId: networkId
    }
    setWalletDetails(walletDetails);
    provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
      setWeb3(undefined);
    });
    provider.on("accountsChanged", (accounts: string[]) => {
      setAccounts(accounts);
      setWalletDetails({ ...walletDetails, defaultAccount: accounts[0] });
      console.log(accounts);
    });
    provider.on("networkChanged", (networkId: number) => {
      console.log(networkId);
      setWalletDetails({ ...walletDetails, networkId: networkId });
    });
  }

  async function connectWallet() {
    if (web3) {
      web3Modal.clearCachedProvider();
      setWalletDetails(undefined);
      setWeb3(undefined);
    }
    else {
      initializeProvider();
    }
  }
  useEffect(() => {
    (async () => {
      console.log("called");
      initializeProvider();
    })();
  }, []);

  // function deployCollection() {
  //   // deploy only if we have valid account selected
  //   // TODO: verify whether account address is valid
  //   if (web3 && defaultAccount) {
  //     let collection: Collection = {
  //       web3: web3,
  //       name: "NFT2021",
  //       symbol: "NNFT",
  //       account: defaultAccount
  //     }
  //     NFT.createCollection(collection).then(res => {
  //       //console.log(res);    
  //       console.log(res.contractAddress);
  //       setContractAddress(res.contractAddress);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }

  // function addItem() {
  //   if (web3 && defaultAccount && contractAddress) {
  //     let item: Item = {
  //       web3: web3,
  //       account: defaultAccount,
  //       contractAddress: contractAddress,
  //       ipfsHash: "QmQxVsopX1ug14eNzDkFCTYo7XLmWuyn1h8GGVVAvUPdui"
  //     }
  //     NFT.addItem(item).then(res => {
  //       console.log(res);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }
  return (<div>
    <div className="App" >
      <Navbar className="navbar-custom" expand="lg" variant="light" bg="light" fixed="top">
        <nav style={{ width: "100%" }} className="nav navbar stickey-top justify-content-between  navbar-light" >
          <div className="col-sm-3 " style={{ paddingLeft: "20px", display: "table" }}>
            <img src={require('./assets/marketplace_icon.png').default} style={{ width: 110, height: 80, float: 'left' }}></img>
            <h4 style={{ color: '#396669', display: "table-cell", verticalAlign: "middle" }}>P2P NFT Marketplace</h4>
          </div>
          <div className="col-sm-5 align-items-center mt-2 "
            style={{ verticalAlign: "middle", paddingLeft: "30px" }}>
            <ul className="nav">
              <input className="form-control" style={{ width: 350 }} type="search" placeholder="Search" aria-label="Search" />
              <li className="nav-item ">
                <a className="nav-link active" style={{ color: "#396669" }} aria-current="page" href="#">Explore</a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" style={{ color: "#396669" }} href="#">Profile</a>
              </li>

            </ul>
          </div>
          <div className="col-sm-4" style={{ display: "grid", textAlign: "center", padding: "5px" }}>
            <div className={`${walletDetails ? "wallet-banner" : ""}`} style={{ alignSelf: "center", padding: "5px" }}>
              <div className="row">
                <div className="col-md-8">
                  <div style={{ float: 'right', textAlign: "left" }}>
                    {
                      walletDetails &&
                      <div>
                        <span  >Network: {networks[walletDetails.networkId] ?? "Custom Network"}</span><br />
                        <span style={{ fontSize: "0.7em" }} >Account: {walletDetails.defaultAccount}</span>
                      </div>
                    }
                  </div>
                </div>
                <div className={`col-md-4 ${!walletDetails ? "wallet-banner" : ""}`} >
                  <div >
                    <img src={require('./assets/wallet.png').default} style={{ width: 50, height: 50, cursor: 'pointer' }} onClick={connectWallet} ></img>
                  </div>
                  {
                    !walletDetails &&
                    <div style={{ marginTop: "-10px" }}>
                      <span style={{ fontSize: "0.8em" }} >
                        Not Connected
                      </span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Navbar>
    </div>
    <div className="App-header" style={{ paddingTop: "140px", marginLeft: "20px", marginRight: "20px" }}>
      {web3 && walletDetails ?
        <div>
          {/* <CreateCollection web3={web3} defaultAccount={defaultAccount}  ></CreateCollection> */}

          {!walletDetails ?
            <div>
              <h2>Failed To Connect to Wallet</h2>
            </div>
            :
            <div >
              <div>
                {!contractAddress ?
                  <Profile walletDetails={walletDetails} ></Profile>
                  :
                  <div>
                    <br /><br />
                    <h3>Collection Created Successfully</h3>
                    <span>Collection Address: {contractAddress}</span><br /><br />
                    {/* <button className="btn btn-info" onClick={addItem}>Add Item</button> */}
                  </div>
                }
              </div>

            </div>

          }
        </div>
        :
        <div style={{ textAlign: "center" }}>
          <h2>Connect Your Wallet to Proceed</h2>
          <img src={require('./assets/wallet.png').default} style={{ width: "200px", height: "200px", cursor: 'pointer' }} onClick={connectWallet}></img>
        </div>
      }
    </div>
  </div>
  );
}


export default App;
