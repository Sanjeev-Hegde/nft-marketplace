import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { TransactionReceipt } from 'web3-core'
import abi  from "../contracts/nft/abi.json";
import bin  from "../contracts/nft/bin.json";

export interface Collection {
    web3:Web3,
    name:string,
    symbol:string,
    account:string
}
export interface Item{
    web3:Web3,
    account:string,
    contractAddress:string,
    ipfsHash:string
}
function createCollection(collection:Collection): Promise<TransactionReceipt> {
    console.log("Creating Collection");
    let web3:Web3 = collection.web3;
    return new Promise((resolve, reject) => {
        var nftContract = new web3.eth.Contract(abi as AbiItem[]);
        var nft = nftContract.deploy({
            data: bin.object,
            arguments: [
                collection.name,
                collection.symbol,
            ]
        }).send({
            from: collection.account
        })
        .on('receipt', receipt =>{
            console.log('Contract mined:');
            console.log(receipt);
            resolve(receipt);                        
        })
        .on('error', err=>{
            console.error(err);
            reject(err);
        });
    })

}

function addItem( item:Item) {
    // console.log("account:"+account);
    // console.log("contractAddress:"+contractAddress);
    // console.log("ipfsHash:"+ipfsHash);
    let web3:Web3 = item.web3;
    return new Promise((resolve, reject) => {
        const contractInstance = new web3.eth.Contract(
            abi as AbiItem[],
            item.contractAddress,
        );
        contractInstance.methods.addItem("ipfs://" + item.ipfsHash)
            .send({
                from: item.account,
                gas: '4700000',
                gasPrice: '40000000000'
            }, (e: any, res: unknown) => {
                console.log(e, res);
                if (e) reject(e);
                else {
                    console.log('New Item Added!! ');
                    resolve(res);
                }
            });
    });

}
export default {    
    createCollection,
    addItem
}