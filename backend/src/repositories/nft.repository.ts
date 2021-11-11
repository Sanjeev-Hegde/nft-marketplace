import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NftdbDataSource} from '../datasources';
import {Nft, NftRelations} from '../models';

export class NftRepository extends DefaultCrudRepository<
  Nft,
  typeof Nft.prototype.id,
  NftRelations
> {
  constructor(
    @inject('datasources.nftdb') dataSource: NftdbDataSource,
  ) {
    super(Nft, dataSource);
  }
}
