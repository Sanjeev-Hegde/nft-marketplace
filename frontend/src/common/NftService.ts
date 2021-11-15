import axios, { AxiosResponse } from "axios";
import { Collection, Item } from "../models/Nft";
const MarketPlaceApi = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});
export default class NftService {
    public static createCollection(collection:Collection):Promise<AxiosResponse<Collection>>{    
        return MarketPlaceApi.post('/nft/collection', collection);
    }

    public static getAllCollections():Promise<AxiosResponse<Collection[]>>{
        return MarketPlaceApi.get('/nft/collection');
    }

    public static getCollectionsOfUser(userAddress:string):Promise<AxiosResponse<Collection[]>>{
        return MarketPlaceApi.get('/nft/user/'+userAddress+"/collection");
    }

    
    public static getCollectionItems(collectionId:string):Promise<AxiosResponse<Item[]>>{
        return MarketPlaceApi.get('/nft/collection/'+collectionId+"/items");
    }

    public static uploadItem(collectionId:string,formdata:FormData):Promise<AxiosResponse<Item>>{    
        return MarketPlaceApi.post('/nft/collection/'+collectionId+'/item/upload', formdata);
    }
}