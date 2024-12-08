import "./ikonsMenu.css";
import {useEffect, useState} from "react";
import BeerListAll from "./BeerListAll";
import SeeInformation from "./SeeInformation";


export default function IkonsMenu({addCart, loading, beers, fetchBeers, cart}) {
    const [activeCategory, setActiveCategory] = useState("drinks");
    const [activeDrinks, setActiveDrinks] = useState("");
    const [selectedBeerId, setSelectedBeerId] = useState(null);
    const [isOpenInform, setIsOpenInform] = useState(false);
    const [sortOption, setSortOption] = useState('name_ascending');
    const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);

    const sortBeers = (beers, option) => {
        switch (option) {
            case "name_ascending":
                return [...beers].sort((a, b) => a.name.localeCompare(b.name));
            case  "name_descending":
                return [...beers].sort((a, b) => b.name.localeCompare(a.name));
            case "abv_ascending":
                return [...beers].sort((a, b) => a.abv - b.abv);
            case "abv_descending":
                return [...beers].sort((a, b) => b.abv - a.abv);
            default:
                return beers;
        }
    }
    const handleSort = (newSortOption) => {
        setSortOption(newSortOption);
        setIsOpenSortMenu(false);
    };

    const handleSortOpenToggle = () => {
        setIsOpenSortMenu(!isOpenSortMenu);
    }

    const handleButtonClick = (category, e) => {
        e.preventDefault();
        setActiveCategory(category);
        if (category === "drinks") {
            setActiveDrinks("");
        }
    };

    const handleFoodCategoryClick = (foodType, e) => {
        e.preventDefault();
        setActiveDrinks(foodType);
        setSelectedBeerId(null);
        fetchBeers(foodType);
    };

    const handleSelectBeer = (id) => {
        setSelectedBeerId(id);
        setIsOpenInform(true);
    };

    const handleCloseInform = () => {
        setIsOpenInform(false);
        setSelectedBeerId(null);
    };

    return (
        <>
            <div className={`classIkonsMenu ${selectedBeerId ? 'blurred' : ""}`}>
                <button onClick={(e) => handleButtonClick("drinks", e)}
                        className={`btnIkonsMenu ${activeCategory === "drinks" ? "active" : ""}`}>
                    <img className="imgikons" src={`${process.env.PUBLIC_URL}/coffee-cup_icon-icons.com_69402.svg`} alt="drinks"/>
                </button>
                <button onClick={(e) => handleButtonClick("food", e)}
                        className={`btnIkonsMenu ${activeCategory === "food" ? "active" : ""}`}>
                    <img className="imgikons" src={`${process.env.PUBLIC_URL}/cutlery.png`} alt="cutlery"/>
                </button>
                <button onClick={(e) => handleButtonClick("discount", e)}
                        className={`btnIkonsMenu ${activeCategory === "discount" ? "active" : ""}`}>
                    <img className="imgikons" src={`${process.env.PUBLIC_URL}/discount_offert_icon_179533.svg`} alt="discount"/>
                </button>
                <button onClick={(e) => handleButtonClick("search", e)}
                        className={`btnIkonsMenu ${activeCategory === "search" ? "active" : ""}`}>
                    <img className="imgikons" src={`${process.env.PUBLIC_URL}/searchmagnifierinterfacesymbol_79894.svg`} alt="search"/>
                </button>
            </div>
            <div className="content">
                {activeCategory === "drinks" &&
                    <div className="clButtonsBear">
                        <button onClick={(e) => handleFoodCategoryClick("", e)}
                                className={`activeDrkCl ${activeDrinks === "" ? "active" : ""}`}>ALL
                        </button>
                        <button onClick={(e) => handleFoodCategoryClick("pizza", e)}
                                className={`activeDrkCl ${activeDrinks === "pizza" ? "active" : ""}`}>PIZZA
                        </button>
                        <button onClick={(e) => handleFoodCategoryClick("steak", e)}
                                className={`activeDrkCl ${activeDrinks === "steak" ? "active" : ""}`}>STEAK
                        </button>
                        <div id="dropDownBtn">
                            <button className="sortButton" onClick={handleSortOpenToggle}>SORT BY</button>
                            {isOpenSortMenu && (
                                <ul id="ulIdDrop">
                                    <li id="liSorting">Sorting</li>
                                    <li className="liOneDrop">
                                        <button className="btnLiDrop" onClick={() => handleSort("name_ascending")}>
                                            name ascending
                                        </button>
                                    </li>
                                    <li className="liOneDrop">
                                        <button className="btnLiDrop" onClick={() => handleSort("name_descending")}>
                                            name descending
                                        </button>
                                    </li>
                                    <li className="liOneDrop">
                                        <button className="btnLiDrop" onClick={() => handleSort("abv_ascending")}>
                                            abv ascending
                                        </button>
                                    </li>
                                    <li className="liOneDrop">
                                        <button className="btnLiDrop" onClick={() => handleSort("abv_descending")}>
                                            abv descending
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                }
                {activeCategory === "food" && <div className="clButtonsFood">
                    <button>All food</button>
                </div>}
                {activeCategory === "discount" && <div className="clButtonsDiscount">
                    <button>All promotional products</button>
                </div>}
                {activeCategory === "search" && <div className="clButtonsSearch">
                    <button>Search products</button>
                </div>}
            </div>
            {activeCategory === "drinks" && beers.length > 0 && (
                <BeerListAll loading={loading}
                             beers={sortBeers(beers, sortOption)}
                             activeDrinks={activeDrinks}
                             setActiveDrinks={setActiveDrinks}
                             handleSelectBeer={handleSelectBeer}
                             fetchBeers={fetchBeers}
                             selectedBeerId={selectedBeerId}
                />)}
            {selectedBeerId && <SeeInformation loading={loading}
                                               beers={beers}
                                               selectedBeerId={selectedBeerId}
                                               handleCloseInform={handleCloseInform}
                                               addCart={addCart}
                                               cart={cart}

            />}
        </>
    );
}