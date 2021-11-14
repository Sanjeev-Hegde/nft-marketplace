import { JSONSchemaType } from "ajv";
import { ItemMetadata } from "../../../models";

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
    ipfsHash:{type:"string"}
  },
  required: ["name"],
  additionalProperties: false
};