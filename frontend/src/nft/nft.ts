import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { TransactionReceipt } from 'web3-core'
import abi from "../contracts/nft/abi.json";
import bin from "../contracts/nft/bin.json";
import { Collection, Item } from "../models/Nft";
import { WalletDetails } from "../models/WalletDetails";

function createCollection(walletDetails: WalletDetails, collection: Collection): Promise<TransactionReceipt> {
    console.log("Creating Collection");
    let web3: Web3 = walletDetails.web3;
    return new Promise((resolve, reject) => {
        var nftContract = new web3.eth.Contract(abi as AbiItem[]);
        var nft = nftContract.deploy({
            data: bin.object,
            arguments: [
                collection.name,
                collection.symbol,
            ]
        }).send({
            from: collection.owner
        })
            .on('receipt', receipt => {
                console.log('Contract mined:');
                console.log(receipt);
                resolve(receipt);
            })
            .on('error', err => {
                console.error(err);
                reject(err);
            });
    })

}

function addItem(walletDetails: WalletDetails, collection: Collection, item: Item) {
    return new Promise((resolve, reject) => {
        let web3: Web3 = walletDetails.web3;
        const contractInstance = new web3.eth.Contract(
            abi as AbiItem[],
            collection.contractAddress,
        );
        contractInstance.methods.addItem("ipfs://" + item.metadata.ipfsHash)
            .send({
                from: item.owner,
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