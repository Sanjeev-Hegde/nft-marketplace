import { useEffect, useState } from "react";
import NftService from "../../common/NftService";
import { Collection, Item } from "../../models/Nft";
import { WalletDetails } from "../../models/WalletDetails";
import nft from "../../nft/nft";
import Loader from "react-loader-spinner";
export default function AddItem(props: any) {
    const [itemName, setItemName] = useState("");
    const [selectedImage, setSelectedImage] = useState<File>();
    const [description, setDescription] = useState();
    let [isCreating, setIsCreating] = useState(false);
    const walletDetails: WalletDetails = props.walletDetails;
    const collection: Collection = props.collection;
    let displayCollectionItems = props.displayCollectionItems;
    useEffect(() => {

    }, [walletDetails, collection])
    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files[0]);
            setSelectedImage(e.target.files[0]);
        }
        else {
            setSelectedImage(undefined);
        }
    };

    const nameChange = (e: any) => {
        setItemName(e.target.value);
    }

    const desriptionChange = (e: any) => {
        setDescription(e.target.value)
    }

    const mintItem = async (e: any) => {
        e.preventDefault();
        setIsCreating(true);
        let item = {
            collectionId: collection.id,
            owner: walletDetails.defaultAccount,
            tokenURL: "",
            metadata: {
                name: itemName,
                description: description
            }
        }
        let file = selectedImage
        var formData = new FormData();
        if (file)
            formData.append("file", file);
        formData.append("item", JSON.stringify(item));
        // console.log(JSON.stringify(item));
        let result: Item = (await NftService.uploadItem("" + collection.id, formData)).data;
        await nft.addItem(walletDetails, collection, result);
        setIsCreating(false);
        displayCollectionItems(collection);
    };
    return (
        <div className="d-flex justify-content-center ">
            <div className={`collection-box container ${isCreating ? "disable" : ""}`} >
                <h4 style={{ display: "inline" }}> Item Details</h4>
                {isCreating &&
                    <div style={{ display: "inline", float: "right" }}>
                        <div style={{ display: "inline-block" }}>Waiting for confirmation</div>&nbsp;
                        <div style={{ display: "inline-block" }}>
                            <Loader
                                type="Puff"
                                color="#00BFFF"
                                height={30}
                                width={30}
                            />
                        </div>

                    </div>
                }
                <hr />
                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={mintItem}>
                            <div className="form-group">
                                <label >Name</label><br />
                                <input className="form-control"
                                    id="name"
                                    aria-describedby="nameHelp"
                                    placeholder="Enter collection name"
                                    onChange={nameChange}
                                    required
                                />
                            </div>
                            <br />
                            <div className="form-group">
                                <label >Description</label><br />
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter collection symbol"
                                    onChange={desriptionChange}
                                />
                            </div>
                            <br />
                            <span>
                                <strong>Note:</strong>
                                This will mint item in blockchian. Lazy minting feature will be availible soon
                            </span>
                            <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                id="formFile"
                                onChange={imageChange}
                                required
                            />
                            <br /> <br />
                            <button type="submit" className="btn btn-info" >Create</button>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <h6>Preview</h6>
                        <div className="card" style={{ width: "20rem", height: "25rem" }}>
                            {selectedImage && <img className="card-img-top" style={{ height: "55%" }} alt="Image Preview" src={URL.createObjectURL(selectedImage)} />}
                            {!selectedImage && <img className="card-img-top" style={{ height: "55%" }} />}
                            <div className="card-body">
                                <h4 className="card-title">{itemName}</h4>
                                <h6 >Token Id: 1</h6>
                                <span style={{ fontSize: "0.75em" }}>Owner: {walletDetails.defaultAccount}</span><br />
                                <button className="btn btn-info" >View On Opensea</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}