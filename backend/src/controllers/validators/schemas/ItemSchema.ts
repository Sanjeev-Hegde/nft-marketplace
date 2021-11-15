import { JSONSchemaType } from "ajv";
import { ItemMetadata, Item } from "../../../models";

export const ItemMetadaSchema: JSONSchemaType<ItemMetadata> = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string", nullable: true },
    properties: {
      type: "array",
      items: {
        type: "object",
        properties: {
          key: { type: "string" },
          value: { type: "string" }
        },
        required: ["key", "value"],
        additionalProperties: false
      },
      nullable: true
    },
    ipfsHash: { type: "string", nullable: true }
  },
  required: ["name"],
  additionalProperties: false
};

export const ItemSchema = {
  type: "object",
  properties: {
    tokenId: { type: "string", nullable: true },
    collectionId: { type: "string" },
    owner: { type: "string" },  //validate owner address inside controller
    tokenURL: { type: "string", nullable: true }, // is null now, will be added by service before save
    metadata: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string", nullable: true },
        properties: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: { type: "string" },
              value: { type: "string" }
            },
            required: ["key", "value"],
            additionalProperties: false
          },
          nullable: true
        },
        ipfsHash: { type: "string", nullable: true }
      },
      required: ["name"],
      additionalProperties: false
    },
  },
  required: ["collectionId", "owner", "metadata"],
  additionalProperties: false
}