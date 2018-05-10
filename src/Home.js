import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            fourRandomListings: [],
            loaded: false
        }
    }
    componentDidMount() {
        this.handleFourRandomListings();
    }

    handleFourRandomListings = () => {
        fetch('/home')
            .then(response => response.text())
            .then(responseBody => {
                let fourRandomListings = JSON.parse(responseBody);
                this.setState({ fourRandomListings, loaded: true });
            })
    }

    render() {

        if (!this.state.loaded) return (
            <div className="loading"><h1>Loading ...</h1> </div>);

        var mapContents = contents =>
            <li className="listingStyle">
                <img src={contents.imageLocation} alt="" />
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                $ {contents.price} <br />
                Sold by: {contents.sellerId} <br />
                <Link className="buyButton" to={"/buy/" + contents.itemId}><span>Buy</span></Link>
            </li>

        let fourListings = this.state.fourRandomListings.map(mapContents);


        return (
            <div >
                <div>
                    <div className="banner1">
                        <Link to='/account'>Your account</Link>
                        <div>
                            <Link to='/allListings'>All listings</Link>
                        </div>
                        <div>
                            <Link to='/create'>Create a listing</Link>
                        </div>
                    </div>
                    <div>
                        <ul>
                            {fourListings}
                        </ul>
                    </div>
                </div>
            </div>)
    }
}

export default Home;

