import {Entity, model, property} from '@loopback/repository';
import { ItemMetadata } from './item_metadata.model';

@model()
export class Item extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  
  @property({
    type: 'string',
  })
  tokenId?: string;

  @property({
    type: 'string',
    generated: false,
    required: true,
  })
  collectionId: string;

  @property({
    type: 'string',
    required: true,
  })
  owner: string; // owner changes on transfer

  @property({
    type: 'string',
    required: true,
  })
  tokenURL?: string;

  @property({
    type: 'object',
    required: true,
  })
  metadata: ItemMetadata;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
