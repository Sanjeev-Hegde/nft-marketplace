# NFT-Marketplace
This is a monorepo of NFT marketplace

## Current Flow
1. User Login using their wallet, currently Metamask
2. User can create new Collection. For this the frontend creates a contract creation transaction and user signes and submits using metamask
3. Frontend tracks contract and gets its address and stores once its mined successfully
4. User uploads a new item to IPFS gets its hash
5. This hash is used to add new item to the collection. THis will be another contract transaction that user signs

## Final Flow
1. User Login using their wallet ( Metamask, Coinbase)
2. User can create new Collection. For this frontend requests abi and binary from backend ( since there can be multiple interfaces like web and mobile contract source code needs to be maintained by backend )
3. Fronted creates a contract creation transaction using abi and binary but only signs and submits the transaction to backend.
4. Backend submits the transaction to blockchain and tracks events like mined contract address and stores it in central database against user address
7. User adds a new item by uploading file and metadata to backend
8. Bakend can store the file in file storages like s3 or ipfs and create publically accessible URL
9. A new metadata object is also created and uploaded to s3/ipfs
10. Frontend gets the metadata hash and creates a new transaction to add new item and signs and submits to backend
