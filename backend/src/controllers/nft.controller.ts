// Uncomment these imports to begin using these cool features!
import { inject, service } from "@loopback/core";
import { get, param, post, requestBody } from "@loopback/openapi-v3";
import { HttpErrors, Request, RestBindings } from "@loopback/rest";
import { RequestHandler, Response } from "express";
import { Item, Nft } from "../models";
import { NftService } from "../services";
import { FILE_UPLOAD_SERVICE } from "../services/keys";
import { AddressValidator, SupportedCurrency } from "./validators/address_validator";

// import {inject} from '@loopback/core';


export class NftController {

  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: RequestHandler,
    @service(NftService) private nftService: NftService
  ) { }



  /**
   * Endpoint to create New Collection
   * @param nftCollection 
   * @returns 
   */
  @post('/nft/collection')
  async createCollection(@requestBody() nftCollection: Nft): Promise<Nft> {
    if (nftCollection.id) throw new HttpErrors.BadRequest("New Collection cannot have id");
    if (!AddressValidator.validate(nftCollection.owner, SupportedCurrency.ETH))
      throw new HttpErrors.BadRequest("Owner Address not Valid");
    if (!AddressValidator.validate(nftCollection.contractAddress, SupportedCurrency.ETH))
      throw new HttpErrors.BadRequest("Contract Address not Valid");
    // TODO: Validate User address is actual owner of contract address from blockchain

    return await this.nftService.createNft(nftCollection);

  }

  /**
   * Endpoint to upload item and its metadata to ipfs and return metadata hash
   * 
   * @param request  
   * @param response 
   * @returns 
   */
  @post('/nft/collection/{id}/item/upload')
  async upload(
    @requestBody.file()
    request: Request,
    @param.path.number('id') id: number,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Partial<Item>> {
    return new Promise<object>(async (resolve, reject) => {
      let nftCollection: Nft = await this.nftService.getNft(id);
      if (!nftCollection) throw new HttpErrors.NotFound("Nft Collection for the passed id does not exist")
      this.handler(request, response, async (err: unknown) => {
        if (err) reject(err);
        else {
          if(!(request.body instanceof Item))
          throw new HttpErrors.BadRequest("Item Format not correct");

          let extract = NftController.getFilesAndFields(request);
          let item = await this.nftService.uploadItem(extract)
            .catch((err: Error) => { throw err });
          resolve(item);
        }
      });
    });
  }

  /**
 * Get files and fields for the request
 * @param request - Http request
 */
  private static getFilesAndFields(request: Request): { files: Express.Multer.File[], item: Partial<Item> } {
    const uploadedFiles = request.files;
    const mapper = (f: Express.Multer.File) => (f);
    let files: Express.Multer.File[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return { files: files, item: request.body };
  }

}


