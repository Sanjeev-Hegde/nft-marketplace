import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NftdbDataSource} from '../datasources';
import {Item, ItemRelations} from '../models';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.nftId,
  ItemRelations
> {
  constructor(
    @inject('datasources.nftdb') dataSource: NftdbDataSource,
  ) {
    super(Item, dataSource);
  }
}
