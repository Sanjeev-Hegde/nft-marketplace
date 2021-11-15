import CreateCollection from "../createCollection/CreateCollection";
import { WalletDetails } from "../../models/WalletDetails";
import { useState } from "react";
import DisplayCollection from "../displayCollections/DisplayCollection";
import DisplayItems from "../displayItems/DisplayItems";
import { Collection } from "../../models/Nft";
import AddItem from "../addItem/AddItem";


enum Display {
    DISPLAY_COLLECTIONS,
    CREATE_COLLECTION,
    DISPLAY_COLLECTION_ITEMS,
    DISPLAY_ADD_ITEM
}

export default function Profile(props: any) {
    let walletDetails: WalletDetails = props.walletDetails;
    let [display, setDisplay] = useState(Display.DISPLAY_COLLECTIONS);
    let [selectedCollection, setSelectedCollection] = useState<Collection>();
    let displayCollections = () => {
        setDisplay(Display.DISPLAY_COLLECTIONS);
    }
    let displayCreateCollection = () => {
        setDisplay(Display.CREATE_COLLECTION);
    }

    let displayCollectionItems = (collection: Collection) => {
        setSelectedCollection(collection);
        setDisplay(Display.DISPLAY_COLLECTION_ITEMS);
    }
    let displayAddItem = () => {
        setDisplay(Display.DISPLAY_ADD_ITEM);
    }
    return (
        <div className="container">
            {
                display != Display.DISPLAY_COLLECTIONS &&
                <button className="btn btn-info btn-sm mb-3" onClick={() => { setDisplay(Display.DISPLAY_COLLECTIONS) }}>
                    Back
                </button>
            }
            <div >
                <div>
                    {(() => {
                        switch (display) {
                            case Display.DISPLAY_COLLECTIONS:
                                return <DisplayCollection
                                    walletDetails={walletDetails}
                                    displayCreateCollection={displayCreateCollection}
                                    displayCollectionItems={displayCollectionItems}
                                ></DisplayCollection>
                            case Display.CREATE_COLLECTION:
                                return <CreateCollection
                                    walletDetails={walletDetails}
                                    displayCollections = {displayCollections}
                                ></CreateCollection>
                            case Display.DISPLAY_COLLECTION_ITEMS:
                                return <DisplayItems
                                    walletDetails={walletDetails}
                                    displayAddItem={displayAddItem}
                                    collection={selectedCollection}
                                ></DisplayItems>
                            case Display.DISPLAY_ADD_ITEM:
                                return <AddItem
                                    walletDetails={walletDetails}
                                    displayCollectionItems={displayCollectionItems}
                                    collection={selectedCollection}
                                ></AddItem>
                            default:
                                return <DisplayCollection
                                    walletDetails={walletDetails}
                                    displayCreateCollection={displayCreateCollection}
                                    displayCollectionItems={displayCollectionItems}
                                ></DisplayCollection>
                        }
                    })()
                    }
                </div>
            </div>
        </div>

    );
}