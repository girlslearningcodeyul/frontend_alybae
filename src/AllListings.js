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
            searchResults: []
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


                this.setState({ listings, searchResults: listings, loaded: true });
            })
    }

    searchItemsByName = (event) => {
        let listings = this.state.listings;
        let string = event.target.value;
        let filteredListings = listings.filter(listing => listing.name.includes(string))
        this.setState({ searchResults: filteredListings })
    }
    searchItemsLowPriceRange = (event) => {
        let listings = this.state.listings;
        let lowPriceInput = event.target.value;
        let filteredLowPriceListings = listings.filter(listing => lowPriceInput <= listing.price)
        console.log(filteredLowPriceListings)
        this.setState({searchResults:filteredLowPriceListings})
    }
    searchItemsHighPriceRange = (event) => {
        let listings = this.state.listings;
        let highPriceInput = event.target.value;
        let filteredHighPriceListings = listings.filter(listing => highPriceInput >= listing.price)
        console.log(filteredHighPriceListings)
        this.setState({searchResults:filteredHighPriceListings})
    }
    render() {

        if (!this.state.loaded) return (
            <div><h1>Loading ...</h1> </div>);


        var mapContents = contents =>
            <li className="listingStyle">
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
                <Link to={"/buy/" + contents.itemId}> Buy this</Link>
            </li >

        let allListings = this.state.searchResults.map(mapContents)


        return (
            <div>
                <div>
                    <Link to='/home'>Back</Link>
                </div>
                <div>
                    <Link to='/buy'>Buy this too</Link>
                </div>
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
                <div className="searchBarHighRange">
                    <input type="text"
                        placeholder="set highest price"
                        onChange={this.searchItemsHighPriceRange}>
                    </input>
                </div>
                <div className="allListings">
                    <ul>
                        {allListings}
                    </ul>
                </div>
            </div>
        )
    }
}

export default AllListings;

