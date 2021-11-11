export interface ItemProperty{
    key:string;
    value:string;
}
export interface ItemMetadata {
    name:string;
    description?: string;
    properties?: ItemProperty[]
}