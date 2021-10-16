//abi, binary are hardcoded for now, will be fetched from backend later

import abi  from "./contracts/abi.json";
import bin  from "./contracts/bin.json";
function createCollection(web3, name, symbol, account) {
    console.log("Creating Collection");
    return new Promise((resolve, reject) => {
        var nftContract = new web3.eth.Contract(abi);
        var nft = nftContract.deploy({
            data: bin.object,
            arguments: [
                name,
                symbol,
            ]
        }).send({
            from: account,
            gas: '4700000',
            gasPrice: '40000000000'
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
        // , function (e, contract) {
        //     console.log(e, contract);
        //     if (typeof contract.address !== 'undefined') {
        //         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        //         resolve(contract);
        //     }
        //     else reject(e);
        // })
    })

}

function addItem(web3,account,contractAddress,ipfsHash ) {
    console.log("account:"+account);
    console.log("contractAddress:"+contractAddress);
    console.log("ipfsHash:"+ipfsHash);
    return new Promise((resolve, reject) => {
        const contractInstance = new web3.eth.Contract(
            abi,
            contractAddress,
        );
        contractInstance.methods.addItem("ipfs://" + ipfsHash)
            .send({
                from: account,
                gas: '4700000',
                gasPrice: '40000000000'
            }, (e, res) => {
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