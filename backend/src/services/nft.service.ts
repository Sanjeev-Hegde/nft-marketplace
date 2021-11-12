import {injectable,  BindingScope, service} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { IpfsService } from './ipfs.service';
import { Item, Nft } from '../models';
import { NftRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class NftService {
  constructor(
    @repository(NftRepository) private nftRepository:NftRepository,    
    @service(IpfsService) private ipfsService: IpfsService
  ) {}

  /*
   * Add service methods here
   */

  createNft(nft:Nft): Promise<Nft>{
    return this.nftRepository.create(nft);
  }

  getNft(id:string):Promise<Nft> {
    return this.nftRepository.findById(id);
  } 

  // only 1 Item allowed for now
  uploadItem(extract: {files:Express.Multer.File[],item:Partial<Item> }): Promise<Partial<Item>>{
    if(extract.files.length>1)
    throw new HttpErrors.BadRequest("Multiple Files Not Supported Yet");      
    return this.ipfsService.uploadItem(extract.files[0],extract.item);  
    //TODO: save item in database
  }

}
