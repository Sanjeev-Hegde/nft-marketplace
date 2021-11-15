import NFT from "../../nft/nft";
import { useForm } from "react-hook-form";
import './CreateCollection.css';
import { WalletDetails } from "../../models/WalletDetails";
import { Collection } from "../../models/Nft";
import NftService from "../../common/NftService";
import Loader from "react-loader-spinner";
import { useState } from "react";
export default function CreateCollection(props: any) {
    let [isCreating, setIsCreating] = useState(false);
    let walletDetails: WalletDetails = props.walletDetails;
    let displayCollections = props.displayCollections;
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: { name: string, symbol: string }) => {
        setIsCreating(true);
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
            setIsCreating(false);
            // Go Back to Explore view
            displayCollections();
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div className="d-flex justify-content-center container">
            <div className={`collection-box ${isCreating ? "disable" : ""}`} >
                <h4 style={{ display: "inline" }}> Create new NFT collection</h4> &nbsp;&nbsp;
                {isCreating &&
                    <div style={{ display: "inline", float: "right" }}>
                        <div style={{ display: "inline-block"}}>Waiting for confirmation</div>&nbsp;
                        <div style={{ display: "inline-block"}}><Loader
                            type="Puff"
                            color="#00BFFF"
                            height={30}
                            width={30}
                        /></div>
             
                    </div>
                }
                <hr />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label >Name</label><br />
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