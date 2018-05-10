import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

//create new listing class
class Buy extends Component {
    constructor() {
        super();
        this.state = {
            item: null,
            sellerId: ""
        }
    }
    componentDidMount() {
        console.log(this.props.itemId);
        fetch("/getItemDetails?itemId=" + this.props.itemId)
            .then(response => response.text())
            .then((responseBody) => {
                console.log(responseBody);
                this.setState({ item: JSON.parse(responseBody) })
            })
    }

    handleBuy = (e) => {
        e.preventDefault();
        fetch('/buyItem?itemId=' + this.props.itemId + '&userId=' + this.props.username)
            .then(response => response.text())
            .then(responseBody => {
                console.log("successfully sent")
                this.props.historyPush('/account');
            })
    }

    render() {

        return (
            <div className="banner1">
                <Link to='/home'>Home</Link>
                <div>
                    {!this.state.item ? <div classname="loading"><h1>Loading...</h1></div> : (
                        <div className="listingStyle">
                            Name: {this.state.item.name} <br />
                            Description: {this.state.item.description}<br />
                            Price: {this.state.item.price} <br />
                            Sold by: {this.state.item.sellerId} <br />
                            <button onClick={this.handleBuy}>Buy</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Buy;

