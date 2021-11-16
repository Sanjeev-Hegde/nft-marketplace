# NFT-Marketplace
This is a monorepo of P2P NFT marketplace

##### This repository is free to be used. Dont forget to give Star if this is helpful

## Current Flow
1. User Login using their wallet, currently Metamask/Torus
2. User can create new Collection. For this the frontend creates a contract creation transaction (ERC721) and user signes and submits using metamask
3. Frontend tracks contract and gets its address and sends it to backend once it is mined successfully
4. User uploads a new item to IPFS. For this frontend uploads using backend api, gets file hash and publically accessible URL. For this backend uses pinata cloud service to upload file and also its metadata JSON to IPFS.
5. This hash is used to add new item to the collection. THis will be another contract transaction that user signs
6. Metadata JSON follows standards followed by Opensea, so your contract and file can be easily read by Opensea or other marketplaces.
7. The Generated contract address can be copied and you can list it in opensea  

## Things To Improve
1. Support for multiple wallet, mobile based Qr code. This should be easy, since the platform already uses web3Modal.
2. Support for Multiple networks. Right now the platform does allow to change network and create NFT, but the frontend and backend needs to be improved
3. Allow Lazy Minting of Collection and items. 
4. Create Exchange Contracts required for P2P trading 
5. Backend currently doesnt track the live contract. This is required since the contract item ownership can change by listing in other marketplaces
