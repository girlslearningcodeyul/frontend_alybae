import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//create new listing class
class AllListings extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            listings: [],
            searchResults: [],
            kw: "", //what's this variable?
            lowPriceInput: "0",
            highPriceInput: Infinity
        }
    }

    componentDidMount() {
        this.handleListings();
    }

    handleListings = () => {
        fetch('/allItems')
            .then(response => response.text())
            .then(responseBody => {
                let listings = JSON.parse(responseBody);
                console.log(listings);

                this.setState({ listings, searchResults: listings, loaded: true });
            })
    }

    searchItemsByName = (event) => {
        let string = event.target.value;
        //    let filteredListings = listings.filter(listing => listing.name.includes(string))
        this.setState({ kw: string }, () => this.filterListings());
    }
    searchItemsLowPriceRange = (event) => {
        let lowPriceInput = event.target.value;
        // let filteredLowPriceListings = listings.filter(listing => lowPriceInput <= listing.price)
        this.setState({ lowPriceInput }, () => this.filterListings());
    }
    searchItemsHighPriceRange = (event) => {
        let highPriceInput = event.target.value;
        //    let filteredHighPriceListings = listings.filter(listing => highPriceInput >= listing.price)
        this.setState({ highPriceInput: highPriceInput === "" ? Infinity : highPriceInput }, () => this.filterListings())
    }
    filterListings = () => {
        //console.log(this.state)
        let filteredListings = this.state.listings.filter(
            listing => Number(this.state.lowPriceInput) <= listing.price &&
                Number(this.state.highPriceInput) >= listing.price &&
                listing.name.includes(this.state.kw))
        //console.log(this.state.kw, filteredListings)
        this.setState({ searchResults: filteredListings });
    }
    //the following function is to display free if the price of the item is set to zero
    displayFree = (price) => {
        if (price === 0) return 'free';
        else return price;
    }

    displayCut = (description) => {
        if (description.length > 20) {
            let substr = description.substr(0,30);
            return substr + "...";
        }
        else return description;
    }
    render() {
        if (!this.state.loaded) return (<div className="loading"><h1>Loading ...</h1> </div>);

        var mapContents = contents =>
            <li className="listingStyle">
                <img src={contents.imageLocation} alt="" />
                {contents.name} <br/><br/>
                {this.displayCut(contents.description)}<br />
                $ {this.displayFree(contents.price)} <br />
                Sold by: {contents.sellerId} <br />
                <Link className="buyButton" to={"/buy/" + contents.itemId}><span>buy</span></Link>
            </li >

        let allListings = this.state.searchResults.map(mapContents)

        return (
            <div>
                <div>
                    <div className="banner1">
                        <Link className="homeLink" to='/home'>Aly-bae</Link>
                        <Link className="homeAccountLink" to='/account'>Your account</Link>
                        <Link className="homeCreateListingsLink" to='/create'>Create a listing</Link>
                    </div>
                    <div className="logout"><a href="" onClick="window.location.reload(true);">Logout</a></div>                    
                    <div className="searchOutline">
                        <div className="searchBar">
                            <input type="text"
                                placeholder="search by name!"
                                onChange={this.searchItemsByName}>
                            </input>
                        </div>
                        <div className="searchBarLowRange">
                            <input type="text"
                                placeholder="Set lowest price"
                                onChange={this.searchItemsLowPriceRange}>
                            </input>
                        </div>
                        <div className="searchImage"> </div>
                        <div className="searchBarHighRange">
                            <input type="text"
                                placeholder="set highest price"
                                onChange={this.searchItemsHighPriceRange}>
                            </input>
                        </div>
                    </div>

                    <div className="allListings">
                        <ul>
                            {allListings}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllListings;

