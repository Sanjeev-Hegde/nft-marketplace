export class ItemProperty{
    key:string;
    value:string;
}
export class ItemMetadata {
    name:string;
    description?: string;
    properties?: ItemProperty[]
}