import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            itemsSold: [], 
            itemsBought: []
        }
    }

    componentDidMount() {
        this.itemsBought();
        this.itemsSold();
    }

    itemsBought = () => {
        fetch('/getItemsBought?userId=' +this.props.username)
            .then(response => response.text())
            .then((items) => {
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }
    itemsSold = () => {
        fetch('/getItemsSold?userId=' + this.props.username)
            .then(response => response.text())
            .then((items) => {
                this.setState({ itemsSold: JSON.parse(items) })
                console.log(items);
            })
    }

    render() {
        var mapItemsBought = contents =>
            <li className="itemsBought">
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
            </li>

        var mapItemsSold = contents =>
            <li className="itemsSold">
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
            </li>

        let itemsBought = this.state.itemsBought.map(mapItemsBought);
        let itemsSold = this.state.itemsSold.map(mapItemsSold);

        return (
            <div>
                Items Bought:
                <div>
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

                <Link to='/home'>Back</Link>
            </div>
        )
    }
}

export default Account;

