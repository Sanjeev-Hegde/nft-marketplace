
import MulticoinAddressValidator from "multicoin-address-validator";

export enum SupportedCurrency {
    ETH = "eth"
}
export class AddressValidator{   
    public static validate(address:string, currency:SupportedCurrency ):boolean{
        return MulticoinAddressValidator.validate(address, currency);
    }
}