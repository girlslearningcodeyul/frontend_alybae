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
            kw: "",
            lowPriceInput: "0",
            highPriceInput: Infinity,
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
        let string = event.target.value;
    //    let filteredListings = listings.filter(listing => listing.name.includes(string))
        this.setState({ kw: string }, () => this.filterListings());
    }
    searchItemsLowPriceRange = (event) => {
        let lowPriceInput = event.target.value;
       // let filteredLowPriceListings = listings.filter(listing => lowPriceInput <= listing.price)
        this.setState({lowPriceInput}, () => this.filterListings());
    }
    searchItemsHighPriceRange = (event) => {
        let highPriceInput = event.target.value;
    //    let filteredHighPriceListings = listings.filter(listing => highPriceInput >= listing.price)
        this.setState({highPriceInput: highPriceInput === "" ? Infinity:highPriceInput}, () => this.filterListings())
    }
    filterListings = () => {
        console.log(this.state)
        let filteredListings = this.state.listings.filter(
            listing => Number(this.state.lowPriceInput) <= listing.price && 
                       Number(this.state.highPriceInput) >= listing.price && 
                       listing.name.includes(this.state.kw))
        console.log(this.state.kw, filteredListings)
        this.setState({searchResults: filteredListings});
    }
    render() {
        if (!this.state.loaded) return (<div className="loading"><h1>Loading ...</h1> </div>);

        var mapContents = contents =>
            <li className="listingStyle">
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
                <Link className="buyButton" to={"/buy/" + contents.itemId}><span>Buy</span></Link>
            </li >

        let allListings = this.state.searchResults.map(mapContents)


        return (
            <div>
                <div>
                    <Link to='/home'>Home</Link>
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
                <div className="searchImage"> </div>
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

