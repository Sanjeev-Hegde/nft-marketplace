import NFT from "../../nft/nft";
import { useForm } from "react-hook-form";
import './CreateCollection.css';
import { WalletDetails } from "../../models/WalletDetails";
import { Collection } from "../../models/Nft";
import NftService from "../../common/NftService";

export default function CreateCollection(props: any) {
    let walletDetails: WalletDetails = props.walletDetails;
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: { name: string, symbol: string }) => {
        let collection: Collection = {
            name: data.name,
            symbol: data.symbol,
            owner: walletDetails.defaultAccount,
            network: {
                networkId: walletDetails.networkId,
                chainId: walletDetails.chainId
            }
        }
        NFT.createCollection(walletDetails, collection).then(async res => {
            //console.log(res);    
            console.log(res.contractAddress);
            collection.contractAddress = res.contractAddress;
            let result = await NftService.createCollection(collection);
            console.log("New Collection Craeted Successfully");
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div>
            <div style={{ width: "400px" }} className=" collection-box" >
                <h4> Create new NFT collection</h4>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label >Name</label><br />
                        {/* <small id="nameHelp" className="form-text text-muted">This name is used to uniquely identify your collection</small> */}
                        <input className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter collection name" {...register("name", { required: true })} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label >Symbol</label><br />
                        <small id="symbolHelp" className="form-text text-muted">Having Symbol will help users identify your collection</small>
                        <input className="form-control" id="name" aria-describedby="symbolHelp" placeholder="Enter collection symbol" {...register("symbol", { required: true })} />
                    </div>
                    <br />
                    <span>
                        <strong>Note:</strong>
                        This will create contract in blockchian. Lazy minting feature will be availible soon
                    </span>
                    <br />
                    <button type="submit" className="btn btn-info" >Create</button>
                </form>
            </div>
        </div>

    );
}