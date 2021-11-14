import { useEffect, useState } from "react";
import NftService from "../../common/NftService";
import { Collection } from "../../models/Nft";
import { WalletDetails } from "../../models/WalletDetails"
import "./DisplayCollection.css"
export default function (props: any) {

    let walletDetails: WalletDetails = props.walletDetails;
    let [collections, setCollections] = useState<Collection[]>([]);
    console.log(collections);
    useEffect(() => {
        if (walletDetails) {
            NftService.getCollectionsOfUser(walletDetails.defaultAccount)
                .then((result) => {
                    setCollections(result.data);
                })
        }
        else {
            NftService.getAllCollections()
                .then((result) => {
                    setCollections(result.data);
                })
        }
    }, [walletDetails]);
    return (<div>
        <div className="grid-container">
            {collections.length > 0 ?
                collections.map(collection => {
                    return (<div>
                        <div className="card" style={{ width: "18rem;", cursor:"pointer"}}>
                            <div className="card-body">
                                <h4 className="card-title">{collection.name}</h4>
                                <h6>Symbol: {collection.symbol}</h6>
                                <span >Network: {collection.network.networkId}</span><br/>
                                <span style={{fontSize:"0.8em"}}>Contract Address: {collection.contractAddress}</span><br/>
                                {/* <a href="#" className="btn btn-primary">Items</a> */}
                            </div>
                        </div>
                    </div>)
                })
                :
                <div>No Collections Found</div>
            }
        </div>
    </div>)
}