import { injectable, BindingScope, service } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { PinataPinResponse } from '@pinata/sdk';
import { Item, ItemMetadata } from '../models';
const { Readable } = require('stream');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

@injectable({ scope: BindingScope.TRANSIENT })
export class IpfsService {

  constructor() {
  }

  private checkIpfsConnection() {
    return pinata.testAuthentication();
  }


  async uploadItem(file: Express.Multer.File, item:Item): Promise<Partial<Item>> {
    try{
      await this.checkIpfsConnection()
      let options = {
        pinataMetadata: {
          name: file.originalname,
        }
      };    
      //console.log(file.originalname);
      const stream = Readable.from(file.buffer);
      stream.path = file.originalname;
      let fileIpfsResult = await pinata.pinFileToIPFS(stream, options);
      let metadataOptions = {
        pinataMetadata: {
          name: fileIpfsResult.IpfsHash + "_metadata",
        }
      };
      item.tokenURL = "https://gateway.pinata.cloud/ipfs/" + fileIpfsResult.IpfsHash;
      let metadata = {
        name: item.metadata?.name,  // get name from item
        description: ""+item.metadata?.description, // get description from item
        image: item.tokenURL 
      }
      
      let metadataResult: PinataPinResponse = await pinata.pinJSONToIPFS(metadata, metadataOptions);       
      item.metadata.ipfsHash = metadataResult.IpfsHash;     
      return item;
    }catch(err){
      console.log(err);
      throw new HttpErrors.ExpectationFailed("Could not upload item to ipfs");
    }
  }

}
