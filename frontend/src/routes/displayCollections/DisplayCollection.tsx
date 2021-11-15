import { useEffect, useState } from "react";
import NftService from "../../common/NftService";
import { Collection } from "../../models/Nft";
import { WalletDetails } from "../../models/WalletDetails"
import "./DisplayCollection.css"
import { useNavigate } from "react-router-dom";
export default function (props: any) {

    let walletDetails: WalletDetails = props.walletDetails;
    let [collections, setCollections] = useState<Collection[]>([]);
    const navigate = useNavigate();
    console.log(collections);
    let displayCreateCollection = props.displayCreateCollection;
    let displayCollectionItems = props.displayCollectionItems;
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

    let displayItems = (collection: Collection) => () => {
        console.log(collection);
        displayCollectionItems(collection);
    };
    return (<div>
        <div >
            <h2 style={{ textAlign: "center", display: "inline" }}>My Collections</h2> &nbsp;&nbsp;
            <button className="btn btn-info btn-sm mb-3" onClick={() => { displayCreateCollection() }}>
                    Create New Collection
            </button>
            <br />
        </div>
        <div className="grid-container">
            {collections.length > 0 ?
                collections.map(collection => {
                    return (<div>
                        <div data-value1={collection} className="card" style={{ cursor: "pointer" }} onClick={displayItems(collection)}>
                            <div className="card-body">
                                <h4 className="card-title">{collection.name}</h4>
                                <h6>Symbol: {collection.symbol}</h6>
                                <span >Network: {collection.network.networkId}</span><br />
                                <span style={{ fontSize: "0.8em" }}>Contract Address: {collection.contractAddress}</span><br />
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