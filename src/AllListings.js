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

    searchItems = (event) => {
        let listings = this.state.listings
        let string = event.target.value;
        console.log(string)
        let filteredListings = listings.filter(listing => listing.name.includes(string))
        console.log(filteredListings)
        this.setState({ searchResults: filteredListings })
    }
    render() {

        if (!this.state.loaded) return (
            <div><h1>Loading ...</h1> </div>);


        var mapContents = contents =>
            <li>
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
            </li>

        let allListings = this.state.searchResults.map(mapContents)


        return (
            <div>
                <div className="searchBar">
                    <input type="text" placeholder="search here" onChange={this.searchItems}>
                    </input>
                </div>
                <div className="allListings">
                    <ul>
                        {allListings}
                    </ul>
                </div>
                <div>
                    <Link to='/home'>Back</Link>
                </div>
                <div>
                    <Link to='/buy'>Buy this too</Link>
                </div>
            </div>
        )

    }
}

export default AllListings;

