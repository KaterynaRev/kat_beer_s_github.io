import "./beerListAll.css";
import {useEffect, useState} from "react";


export default function BeerListAll({
                                        loading,
                                        beers,
                                        activeDrinks,
                                        setActiveDrinks,
                                        fetchBeers,
                                        handleSelectBeer,
                                        selectedBeerId,
                                    }) {
    const [page, setPage] = useState(0);
    const itemsPerPage = 9;
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [touchEndY, setTouchEndY] = useState(null);
    const [isTochMove, setIsTochMove] = useState(false);
    const currentBeers = beers.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    const handleSwipeVertical = (e) => {
        const diff = touchStartY - touchEndY;
        if (diff > 40 && page < Math.ceil(beers.length / itemsPerPage) - 1) {
            setPage(prevPage => prevPage + 1);
        } else if (diff < -40 && page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleSwipeHorizontal = (e) => {
        if (!touchStartX || !touchEndX) {
            return;
        }
        const minSwipeDistance = 40;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe) {
            if (activeDrinks === "") {
                setActiveDrinks("pizza");
                fetchBeers("pizza");
            } else if (activeDrinks === "pizza") {
                setActiveDrinks("steak");
                fetchBeers("steak");
            }
        }
        if (isRightSwipe) {
            if (activeDrinks === "steak") {
                setActiveDrinks("pizza");
                fetchBeers("pizza");
            } else if (activeDrinks === "pizza") {
                setActiveDrinks("");
                fetchBeers("");
            }
        }
    }

    const onTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);

    };

    const onTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
        setTouchEndY(e.touches[0].clientY);
        setIsTochMove(true);
    };

    const onTouchEnd = (e) => {
        if (isTochMove) {
            handleSwipeVertical();
            handleSwipeHorizontal();
        }
        setIsTochMove(false);
    }
    const handleBeerClick = (id, event) => {
        event.stopPropagation();
        event.preventDefault();
        handleSelectBeer(id);
    }

    useEffect(() => {
        return () => {
            setTouchStartX(null);
            setTouchEndX(null);
            setTouchStartY(null);
            setTouchEndY(null);
            setIsTochMove(false);
        };
    }, []);

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={`beerAll ${selectedBeerId ? 'blurred' : ''}`}>
            {loading ? (
                <p id="pLoading">Loading...</p>
            ) : (
                <div className="beerContainer">
                    <div className="beerList">
                        {currentBeers.length > 0 ? (
                            currentBeers.map((beer) => (
                                <div key={beer.id} className="beerItem" onClick={(e) => {
                                    handleBeerClick(beer.id, e)
                                }}>
                                    <div className="imgBeerAll">
                                        {beer.image_url ? (
                                            <img src={beer.image_url} alt={beer.name}
                                                 onError={(e) => e.target.style.display = 'none'}/>
                                        ) : (
                                            <span className="altText">{beer.name}</span>
                                        )}
                                    </div>
                                    <h3 className="nameBeerh3">{beer.name}</h3>
                                    <p className="priceBeerP"><strong>{beer.ibu}</strong></p>
                                </div>
                            ))
                        ) : (
                            <p>No beers found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}