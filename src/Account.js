import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            itemsBought: [],
            itemsSold: []
        }
    }

    componentDidMount() {
        this.itemsBought();
        this.itemsSold();
    }

    itemsBought = () => {
        fetch('/getItemsBought?userId=' + this.props.username)
            .then(response => response.text())
            .then((items) => {
                console.log(this.state.itemsBought);
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }
    itemsSold = () => {
        fetch('/getItemsSold?userId=' + this.props.username)
            .then(response => response.text())
            .then((items) => {
                console.log(items);
                this.setState({ itemsSold: JSON.parse(items) })

            })
    }

    render() {
        var mapItemsBought = contents =>
            <li className="itemsBought">
                <img src={contents.imageLocation} alt="" />
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
            </li>

        var mapItemsSold = contents =>
            <li className="itemsSold">
                <img src={contents.imageLocation} alt="" />
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
            </li>

        let itemsBought = this.state.itemsBought.map(mapItemsBought);
        let itemsSold = this.state.itemsSold.map(mapItemsSold);

        return (
            <div>
                <div className="banner1">
                    <Link className="accountHomeLink" to='/home'>Aly-bae</Link>
                    <Link className="homeAllListingsLink" to='/allListings'>All listings</Link>
                    <Link className="homeCreateListingsLink" to='/create'>Create a listing</Link>
                </div>
                <div>
                    Items Bought:
                    <ul>
                        {itemsBought}
                    </ul>
                </div>
                Items Sold:
                <div>
                    <ul>
                        {itemsSold}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Account;

