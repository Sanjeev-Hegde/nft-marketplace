import {Entity, model, property} from '@loopback/repository';

@model()
export class Nft extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  symbol: string;

  @property({
    type: 'string',
    required: true
  })
  owner: string;

  @property({
    type: 'string',
    required: true
  })
  contractAddress: string;


  constructor(data?: Partial<Nft>) {
    super(data);
  }
  
}

export interface NftRelations {
  // describe navigational properties here
}

export type NftWithRelations = Nft & NftRelations;
