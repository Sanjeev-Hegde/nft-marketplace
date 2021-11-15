import {injectable,  BindingScope, service} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { IpfsService } from './ipfs.service';
import { Item, Nft } from '../models';
import { ItemRepository, NftRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class NftService {
  constructor(
    @repository(NftRepository) private nftRepository:NftRepository, 
    @repository(ItemRepository) private itemRepository:ItemRepository,     
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
  getAllNfts():Promise<Nft[]> {
    return this.nftRepository.find();
  }
  
  getUserNfts(id:string):Promise<Nft[]> {
    return this.nftRepository.find({where:{owner:id}});
  } 

  getCollectionItems(id:string):Promise<Item[]> {
    return this.itemRepository.find({where:{collectionId:id}});
  }

  // only 1 Item allowed for now
  async uploadItem(extract: {files:Express.Multer.File[],item:Item}): Promise<Item>{
    if(extract.files.length>1)
    throw new HttpErrors.BadRequest("Multiple Files Not Supported Yet");      
    let result = await this.ipfsService.uploadItem(extract.files[0],extract.item);
    //console.log(result);
    return this.itemRepository.create(result);
    //TODO: save item in database
  }

}
