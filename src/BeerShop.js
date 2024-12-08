import IkonsMenu from "./IkonsMenu";
import BusketMenu from "./BusketMenu";
import {useState, useEffect} from "react";

export default function BeerShop() {
    const [cart, setCart] = useState([]);
    const [countBeer, setCountBeer] = useState({});
    const [beers, setBeers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpenBusket, setIsOpenBusket] = useState(false);
    // const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
    // const apiUrl = process.env.API_URL;


    const updateCartInLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('countBeer', JSON.stringify(countBeer));
    }

    const getCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const getCountBeerFromLocalStorage = () => {
        const savedCountBeer = localStorage.getItem("countBeer");
        return savedCountBeer ? JSON.parse(savedCountBeer) : {};
    };

    useEffect(() => {
        const savedCart = getCartFromLocalStorage();
        const savedCountBeer = getCountBeerFromLocalStorage();
        if (savedCart.length > 0 || Object.keys(savedCountBeer).length > 0) {
            setCart(savedCart);
            setCountBeer(savedCountBeer);
        }
    }, []);

    useEffect(() => {
        updateCartInLocalStorage();
    }, [cart, countBeer])

    const getTotalPrice = () => {
        return cart.reduce((total, beer) => {
            const beerCount = countBeer[beer.id] || 0;
            return total + (beerCount * beer.price);
        }, 0);
    };

    const fetchBeers = (foodType = "") => {
        setLoading(true);
        fetch(`${process.env.PUBLIC_URL}/mockBrewdog.json`)
            .then(response => response.json())
            .then(data => {
                if (foodType && foodType.trim() !== "") {
                    const filteredBeers = data.filter(beer => {
                        if (Array.isArray(beer.food_pairing)) {
                            return beer.food_pairing.some(food =>
                                food.toLowerCase().includes(foodType.toLowerCase())
                            );
                        } else if (typeof beer.food_pairing === "string") {
                            return beer.food_pairing.toLowerCase().includes(foodType.toLowerCase());
                        }
                        return false;
                    });
                    setBeers(filteredBeers);
                } else {
                    setBeers(data); // Якщо foodType не задано, показати всі пива
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Error fetching beers:', error);
            });
    };

    useEffect(() => {
        fetchBeers();
    }, []);

    // const fetchBeers = async (foodType = "") => {
    //     console.log("Fetching beers for:", foodType);
    //     setLoading(true);
    //     try {
    //         const response = await fetch('https://beer9.p.rapidapi.com/?brewery=BrewDog', {
    //             method: 'GET',
    //             headers: {
    //                 'X-RapidAPI-Key': '0712eaab8fmsh4fc4390fb23cafbp1197f2jsne3ec848ca1fc',
    //                 'X-RapidAPI-Host': 'beer9.p.rapidapi.com',
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         const beers = data.data;
    //
    //         if (Array.isArray(beers)) {
    //             if (foodType) {
    //                 const filteredBeers = beers.filter(beer => beer.food_pairings && beer.food_pairings.includes(foodType));
    //                 setBeers(filteredBeers);
    //             } else {
    //                 setBeers(beers);
    //             }
    //         } else {
    //             console.error("Expected an array but got:", data);
    //             setBeers([]);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching beers:", error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     fetchBeers().then(() => {
    //     }).catch((error) => {
    //         console.error('Error during fetchBeers:', error);
    //     });
    // }, []);

    const addInCart = (beer) => {
        if ((!cart.some(item => item.id === beer.id))) {
            setCart([...cart, beer]);
            setCountBeer(prevCount => ({
                ...prevCount,
                [beer.id]: 1,
            }));
        }
    };

    const containerHeight = cart.length === 0
        ? (isOpenBusket ? '79vh' : '10%') : (isOpenBusket ? '79vh' : '17%')
            ? (isOpenBusket ? '79vh' : '17%') : (isOpenBusket ? '79vh' : '40%');


    const handleOpenBusket = () => {
        setIsOpenBusket(prevBus => !prevBus);
    }

    const addCountBeer = (beerId) => {
        setCountBeer(prevCount => {
            const newCount = {...prevCount, [beerId]: (prevCount[beerId] || 0) + 1};
            return newCount;
        });
    };

    const subtractCountBeer = (beerId) => {
        setCountBeer(prevCounts => {
            const newCounts = {...prevCounts, [beerId]: Math.max((prevCounts[beerId] || 0) - 1, 0)};
            return newCounts;
        })
    };

    const deletedBeer = (beerId) => {
        setCart(cart.filter(item => item.id !== beerId));
        setCountBeer(prevCountD => {
            const {[beerId]: deleted, ...remainingCount} = prevCountD;
            return remainingCount;
        })
    };

    return (
        <>
            <IkonsMenu addCart={addInCart}
                       beers={beers}
                       loading={loading}
                       fetchBeers={fetchBeers}
                       cart={cart}/>
            <BusketMenu cart={cart}
                        setCart={setCart}
                        containerHeight={containerHeight}
                        addCountBeer={addCountBeer}
                        subtractCountBeer={subtractCountBeer}
                        countBeer={countBeer}
                        deletedBeer={deletedBeer}
                        handleOpenBusket={handleOpenBusket}
                        isOpenBusket={isOpenBusket}
                        totalPrice={getTotalPrice()}/>
        </>
    )
}