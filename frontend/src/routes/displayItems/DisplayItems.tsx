import { useEffect, useState } from "react";
import NftService from "../../common/NftService";
import { Collection, Item } from "../../models/Nft";
import { WalletDetails } from "../../models/WalletDetails"
import "./DisplayItems.css"
export default function DisplayItems(props: any) {
    let walletDetails: WalletDetails = props.walletDetails;
    let collection: Collection = props.collection;
    let displayAddItem = props.displayAddItem;
    let [items, setItems] = useState<Item[]>([]);
    console.log(items);
    useEffect(() => {
        if (collection.id)
            NftService.getCollectionItems(collection.id)
                .then((result) => {
                    console.log("Resultttt");
                    console.log(result.data);
                    setItems(result.data);
                });

    }, [collection]);

    let addItem = (collection: Collection) => () => {
        console.log(collection);
        displayAddItem(collection);
    };
    return (<div className="container">
        <div className="row">
            <div >
                <h2 style={{ textAlign: "center", display: "inline" }}>{collection.name}</h2> &nbsp;&nbsp;
                <button className="btn btn-info mb-2" style={{ float: "right" }} onClick={addItem(collection)}>Add Item</button>                
            </div><br />
            <br /><hr /><br />
            <div>
                <div className="grid-container-item">
                    {items.length > 0 ?
                        items.map(item => {
                            return (<div>
                                <div className="card" style={{ height: "100%", cursor: "pointer" }}>
                                    <img className="card-img-top" style={{ height: "55%" }} src={item.tokenURL} alt={item.metadata.name} />
                                    <div className="card-body">
                                        <h4 className="card-title">{item.metadata.name}</h4>
                                        <h6 >Token Id: {item.tokenId}</h6>
                                        <span>Owner: {item.owner}</span><br />
                                    </div>
                                </div>
                            </div>)
                        })
                        :
                        <div>No Items Found</div>
                    }
                </div>

            </div>

        </div>
    </div>)
}