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
                //console.log(this.state.itemsBought);
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }
    itemsSold = () => {
        fetch('/getItemsSold?userId=' + this.props.username)
            .then(response => response.text())
            .then((items) => {
                //console.log(items);
                this.setState({ itemsSold: JSON.parse(items) })

            })
    }
    //the following function is to display free if the price of the item is set to zero
    displayFree = (price) => {
        if (price === 0) return 'free';
        else return price;
    }

    render() {
        var mapItemsBought = contents =>
            <li className="itemsBought">
                <img src={contents.imageLocation} alt="" />
                {contents.name} <br /><br />
                {contents.description}<br />
                $ {this.displayFree(contents.price)} <br />
                Sold by: {contents.sellerId} <br />
            </li>

        var mapItemsSold = contents =>
            <li className="itemsSold">
                <img src={contents.imageLocation} alt="" />
                {contents.name} <br /><br />
                {contents.description}<br />
                $ {this.displayFree(contents.price)} <br />
            </li>

        let itemsBought = this.state.itemsBought.map(mapItemsBought);
        let itemsSold = this.state.itemsSold.map(mapItemsSold);

        return (
            <div>
                <div className="banner1">
                    <Link className="logo" to='/home'></Link>
                    <Link className="homeAllListingsLink" to='/allListings'>ALL LISTINGS</Link>
                    <Link className="homeAccountLink" to='/account'>YOUR ACCOUNT</Link>
                    <Link className="homeCreateListingsLink" to='/create'>CREATE A LISTING</Link>
                    <div className="homeLogoutLink"><a href="" onClick="window.location.reload(true)">LOGOUT</a></div>
                </div>

                <div className="itemsBoughtSold"> ITEMS YOU'VE BOUGHT:</div>
                <ul>
                    {itemsBought}
                </ul>

                <div className="itemsBoughtSold">ITEMS YOU'VE SOLD:</div>
                <ul>
                    {itemsSold}
                </ul>

            </div>
        )
    }
}

export default Account;

