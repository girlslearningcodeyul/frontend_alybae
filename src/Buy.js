import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

//create new listing class
class Buy extends Component {
    constructor() {
        super();
        this.state = {
            item: {},
            sellerId: "",
            forSale: false //may not be required
        }
    }
    componentDidMount() {
        fetch("/getItemDescription?itemId=" + this.props.itemId)
            .then(response => response.text())
            .then((responseBody) => {
                this.setState({ item: JSON.parse(responseBody) })
            })
    }

    handleBuy = (e) => {
        e.preventDefault();
        let body = JSON.stringify({
            buyerId: this.props.username, //the name of the buyer, which is currently logged in as user
            sellerId: this.state.sellerId,//the name of the seller
            forSale: this.state.forSale //may need to remove this
        })
        fetch('/buyItem', { method: "POST", body: body })
            .then(response => response.text())
            .then(responseBody => {
                console.log("successfully sent");
                this.props.historyPush('/account');
            })
    }

    //process all the parameters of an item, but intead of link do a buttom with an Onclick and handleBuy, which will send the data back to the server and update the items bought and items sold functions
    render() {
        var mapContents = contents =>
            <li className="listingStyle">
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
                <button onClick={this.handleBuy}>Buy</button>
            </li>

        let newItem = Object.keys(this.state.item);
        let listing = newItem.map(mapContents);

        return (
            <div>
                <Link to='/home'>Back</Link>
                <ul>
                    {listing}
                </ul>
            </div>
        )
    }
}

export default Buy;

