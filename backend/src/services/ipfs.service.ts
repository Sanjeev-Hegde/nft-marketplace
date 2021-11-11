import { injectable,  BindingScope, service } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { PinataPinResponse } from '@pinata/sdk';
import { NftService } from '.';
import { Item } from '../models';

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

@injectable({ scope: BindingScope.TRANSIENT })
export class IpfsService {

  constructor() {
  }

  private checkIpfsConnection() {
    return pinata.testAuthentication();
  }


  uploadItem(file: Express.Multer.File, item: Partial<Item>): Promise<Partial<Item>> {
    return new Promise(async (resolve, reject) => {
      await this.checkIpfsConnection()
        .catch((err: Error) => reject(new HttpErrors.GatewayTimeout("Failed to connect to Pinata Ipfs:" + err.toString())));
      let options = {
        pinataMetadata: {
          name: file.originalname,
        }
      };
      let fileIpfsResult = pinata.pinFileToIPFS(file.stream, options)
        .catch((err: Error) => reject(new HttpErrors.InternalServerError("Unable pin file to Ipfs:" + err.toString())));

      let metadataOptions = {
        pinataMetadata: {
          name: fileIpfsResult.IpfsHash + "_metadata",
        }
      };
      let metadata = {
        name: "",  // get name from item
        description: "", // get description from item
        image: "https://gateway.pinata.cloud/ipfs/" + fileIpfsResult.IpfsHash
      }

      let result:PinataPinResponse = pinata.pinJSONToIPFS(metadata, metadataOptions)
        .catch((err: Error) => reject(new HttpErrors.InternalServerError("Unable pin metadata:" + err.toString())));

      item.tokenURL = "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash;      
      resolve(item);

    });
  }

}
