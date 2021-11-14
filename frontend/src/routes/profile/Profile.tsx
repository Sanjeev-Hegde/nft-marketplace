import CreateCollection from "../createCollection/CreateCollection";
import { WalletDetails } from "../../models/WalletDetails";
import { useState } from "react";
import { Collection } from "../../models/Nft";
import DisplayCollection from "../displayCollections/DisplayCollection";

export default function Profile(props: any) {
    let walletDetails: WalletDetails = props.walletDetails;
    let [isCreateNewCollection, setIsCreateNewCollection] = useState(false);
    function toggleCreateNewCollection() {
        setIsCreateNewCollection(!isCreateNewCollection);
    }
    return (
        <div className="container">
            <div className="row" >
                <div >
                    <h2 style={{ textAlign: "center", display: "inline" }}>My Collections</h2> &nbsp;&nbsp;
                    <button className="btn btn-info btn-sm mb-3" onClick={toggleCreateNewCollection}>
                        {isCreateNewCollection ? "Back" : "Create New Collection"}
                    </button>
                </div>
                <br />
                <div>
                    {isCreateNewCollection ?
                        <CreateCollection walletDetails={walletDetails}  ></CreateCollection>
                        :
                        <DisplayCollection walletDetails={walletDetails} />
                    }
                </div>
            </div>
        </div>

    );
}