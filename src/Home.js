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
    displayFree = (price) => {
        if (price === 0) return 'free';
        else return price;
    }

    displayCut = (description) => {
        if (description.length > 20) {
            let substr = description.substr(0,30);
            return substr + "...";
        }
        else return description;
    }
    render() {

        if (!this.state.loaded) return (
            <div className="loading"><h1>Loading ...</h1> </div>);

        var mapContents = contents =>
            <li className="listingStyle">
                <img src={contents.imageLocation} alt="" />
                {contents.name} <br/><br/>
                {this.displayCut(contents.description)}<br />
                $ {this.displayFree(contents.price)} <br />
                Sold by: {contents.sellerId} <br />
                <Link className="buyButton" to={"/buy/" + contents.itemId}><span>buy</span></Link>
            </li>

        let fourListings = this.state.fourRandomListings.map(mapContents);


        return (
            <div >
                    <img src="images/logo.png" alt="logo"></img>                                        
                    <div className="banner1">
                        <Link className="homeAccountLink" to='/account'>YOUR ACCOUNT</Link>
                        <Link className="homeAllListingsLink" to='/allListings'>ALL LISTINGS</Link>
                        <Link className="homeCreateListingsLink" to='/create'>CREATE A LISTING</Link>
                        <div className ="homeLogoutLink"><a href="" onClick="window.location.reload(true)">LOGOUT</a></div>
                    </div>         
                    
                      
                    <div>
                        <ul>
                            {fourListings}
                        </ul>
                    </div>
                </div>
            )
    }
}

export default Home;

