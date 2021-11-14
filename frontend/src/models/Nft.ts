export interface Network{    
    networkId:number,
    chainId:number,
    blockchain?:string
}

export interface Collection {
    name:string,
    symbol:string,
    owner:string,
    contractAddress?:string,
    network:Network
}

export interface ItemProperty{
    key:string;
    value:string;
}
export interface ItemMetadata {
    name:string;
    description?: string;
    properties?: ItemProperty[],
    ipfsHash:string
}
export interface Item{
    tokenId?:string,
    collectionId:string,
    tokenURL: string,
    metadata:ItemMetadata,
    owner:string
}
