import "./seeInformation.css";
import {useState} from "react";

export default function SeeInformation({
                                           loading,
                                           beers,
                                           selectedBeerId,
                                           handleCloseInform,
                                           addCart,
                                           cart
                                       }) {

    const currentBeer = beers.find(beer => beer.id === selectedBeerId);
    const [descriptionCollapse, setDescriptionCollapse] = useState(true);
    const [foodPairingCollapse, setFoodPairingCollapse] = useState(true);

    const handleAddInCart = () => {
        if (currentBeer) {
            addCart(currentBeer);
        }
    };

    const toggleDescriptionCollapse = () => {
        setDescriptionCollapse(!descriptionCollapse);
    }

    const togglefoodPairingCollapse = () => {
        setFoodPairingCollapse(!foodPairingCollapse);
    }
    const getWordsDescription = (description) => {
        const words = description.split(" ");
        const firstSomeWords = words.slice(0, 4);
        return firstSomeWords;
    };

    const getWordsFoodPairings = (food_pairing, foodPairingCollapse) => {
        const fS = food_pairing.split(" ");
        const fSt = fS.slice(0, 2);
        if (foodPairingCollapse) {
            const firstTwoItems = fSt;
            return firstTwoItems ? firstTwoItems : food_pairing;
        }
        return food_pairing;
    };

    const isBeerInCart = cart.some(item => item.id === selectedBeerId);

    return (
        <>
            <button id="btnClose" onClick={handleCloseInform}>CLOSE</button>
            <div className="beerSee">
                {loading ? (
                    <p id="pLoadingSee">Loading...</p>
                ) : currentBeer ? (
                    <div className="beerContainerSee">
                        <div className="beerListSee">
                            <div key={currentBeer.id} className="beerItemSee">
                                <div className="imgBeerSee" >
                                    {currentBeer.image_url ? (
                                        <img src={currentBeer.image_url}
                                             alt={currentBeer.name}
                                             onError={(e) => e.target.style.display = 'none'}/>
                                    ) : (
                                        <span className="altTextImg">{currentBeer.name}</span>
                                    )}
                                </div>
                                <h3 className="nameBeerh3See">{currentBeer.name}</h3>
                                <p className="tagLineSee">{currentBeer.tagline}</p>
                                <p className="abvSee">ABV {currentBeer.abv}%</p>
                                <div className="descriptionContainer">
                                    <p className={`descriptionSee ${descriptionCollapse ? "collapsed" : ""}`}
                                       onClick={toggleDescriptionCollapse}>
                                        {descriptionCollapse ? getWordsDescription(currentBeer.description) : currentBeer.description}</p>
                                    {currentBeer.description.length > 3 && (
                                        <button className="collapseButtonD" onClick={toggleDescriptionCollapse}>
                                            {descriptionCollapse ? "Read more" : "Show less"}
                                        </button>
                                    )}
                                </div>
                                <div className="food_pairingSeeContainer">
                                    <p className={`food_pairingSee ${foodPairingCollapse ? "collapsed" : ""}`}
                                       onClick={togglefoodPairingCollapse}>
                                        Food
                                        Pairings: {getWordsFoodPairings(currentBeer.food_pairing, foodPairingCollapse)}
                                    </p>
                                    {currentBeer.food_pairing.length > 2 && (
                                        <button className="collapseButtonP" onClick={togglefoodPairingCollapse}>
                                            {foodPairingCollapse ? "Read more" : "Show less"}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <button onClick={handleAddInCart}
                                    id="btnAddCart">{isBeerInCart ? "IN CART" : "ADD TO CART"}</button>
                        </div>
                    </div>
                ) : (
                    <p>No beers found.</p>
                )}
            </div>
        </>
    );
}