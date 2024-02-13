import React, { useState, useId } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from '../context/UserContext.js';
import searchIcon from "../assets/searchIcon.png";
import shoppingCart from "../assets/shoppingCart.png";

function Home() {
    const { user, setUser } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([{}]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(1000000);
    const [cart, setCart] = useState({
        items: 0,
        totalPrice: 0
    });
    const [skip, setSkip] = useState(0);
    const [totalResults, setTotalResults] = useState(0);


    const handleUser = async() => {
        setLoading((prev) => (false));
        const token = localStorage.getItem("token");
        if(!token || token === "") return;
        try {
            let response = await axios.get("https://dummyjson.com/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if(response.status === 200) {
                setUser(response.data);
            }
        setLoading((prev) => (true));

        }catch (e) {
            console.log(e);
        setLoading((prev) => (true));
        }
    }

    const handleProducts = async () => {
        setLoading((prev) => false);
        try {
            let response = await axios.get(`https://dummyjson.com/products?limit=20&skip=${skip}`);
            setProducts(response.data.products);
            setTotalResults(response.data.total);
        }catch(e) {
            console.log(e);
        }
        window.scrollTo(0,0);
        setLoading((prev) => true);
    }

    const handleSearch = async () => {
        setLoading((prev) => false);
        setSkip(0);
        const url = `https://dummyjson.com/products/search?q=${search}&limit=20&skip=${skip}`;
        try {
            let response = await axios.get(url);
            setProducts(response.data.products);
            setTotalResults(response.data.total);
        } catch(e) {
            console.log(e);
        }
        setLoading((prev) => true);
    }

    useEffect(() => {
        if(user) return;
        handleUser();
    }, [])

    useEffect(() => {
        handleProducts();
    }, [skip])

    let i = 1;

    return (
        <>
            {!loading && <div className='container d-flex flex-row align-items-center justify-content-center' style={{height: '100vh'}}><div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div></div>
            }
            {loading && !user && <div>
                <div className='container d-flex flex-row align-items-center justify-content-center' style={{height: "100vh"}}><h2>Please Login To Continue</h2></div>
            </div>}

            {loading && user && 
            <>
                <div className='container d-flex flex-row align-items-center justify-contents-around my-4'>
                    <div className="mb-3 d-flex flex-row align-items-center w-50">
                        <input
                        type="text"
                        className="form-control w-75"
                        id="formGroupExampleInput"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn btn-primary mx-3" onClick={handleSearch}><img src={searchIcon} /></button>
                    </div>
                        <label htmlFor="filter">Budget $</label>
                        <input type="number" id='filter' className="form-control w-25 mx-2" value={filter} onChange={(e) => {setFilter(e.target.value)}}/>
                    <span className='badge bg-primary float-end'>
                        <img src={shoppingCart} />
                        Cart Items: {cart.items}
                        <br/>Cart Total Price: ${cart.totalPrice}
                    </span>
                </div>
                <div className='container text-center'>
                <div className='row row-cols-4'>
                {
                    products.map((product) => {
                        const { title, description, price, thumbnail } = product;
                        if(price > filter) return;
                        // const id = useId();
                        return (
                            <div className='col my-3' key={i++}>
                                <div className="card" style={{width: "18rem", height: '20%'}}>
                                        <img src={thumbnail} className="card-img-top"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{title}</h5>
                                            <p className="card-text">{description}</p>
                                            <p><b>Price: ${price}</b></p>
                                            <button className='btn btn-primary' onClick={() => {
                                            setCart((prev) => ({
                                                items: prev.items+1,
                                                totalPrice: prev.totalPrice + price
                                            }))
                                        }}>
                                            Add To Cart
                                        </button>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                </div>

                <button
                disabled={skip===0}
                onClick={() => setSkip((prev) => prev-20)}
                className='btn btn-lg btn-primary mx-5 my-3 px-4 py-2 float-start'
                >Prev</button>

                <button
                disabled={skip+20 > totalResults}
                onClick={() => setSkip((prev) => prev+20)}
                className='btn btn-lg btn-primary mx-5 my-3 px-4 py-2 float-end'
                >Next</button>
            </>}
        </>
    )
}

export default Home