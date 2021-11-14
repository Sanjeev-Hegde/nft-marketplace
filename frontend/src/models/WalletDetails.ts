import Web3 from "web3";

export interface WalletDetails {
    web3: Web3;
    defaultAccount: string;
    networkId:number;
    chainId:number;
}