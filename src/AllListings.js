import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//create new listing class
class AllListings extends Component {
    constructor() {
        super();
        this.state = {
            sellerId: "",
            price: 0,
            description: "",
            name: ""
        }
    }

    componentDidMount() {
        this.handleListings();
    }

    handleListings = () => {
        let body = JSON.stringify({
            sellerId: this.props.username,//the name of the seller
            price: this.state.price,
            description: this.state.description,
            name: this.state.name
        })

        fetch('/allItems', { method: "POST", body: body })
            .then(response => response.text())
            .then(responseBody => {
                let listings = JSON.parse(responseBody);
                console.log(listings);
                this.setState({ listings });
            })
    }

    render() {
        var mapContents = contents => <li>{contents.sellerId} <br />
            {contents.price} <br />
            {contents.description}<br />
            {contents.name}</li>

        let allListings = this.state.listings.map(mapContents)

        return (
            <div>
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

