import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Home extends Component {

    constructor(){
        super();
        this.state = {
            fourListings: [],
            loaded: false
        }
    }
    componentDidMount() {
        this.handleFourListings();
    }

    handleFourListings = () => {
        fetch('/home')
            .then(response => response.text())
            .then(responseBody => {
                let listings = JSON.parse(responseBody);
                this.setState({ listings, loaded: true });
            })
    }

    render() {

        if (!this.state.loaded) return (
            <div><h1>Loading ...</h1> </div>);

        var mapContents = contents =>
            <li className="fourListings">
                Name: {contents.name} <br />
                Description: {contents.description}<br />
                Price: {contents.price} <br />
                Sold by: {contents.sellerId} <br />
            </li>

        let fourListings = this.state.fourListings.map(mapContents);

        return (
            <body>
                <div>
                    <div>
                        <Link to='/account'>go to your account</Link>
                    </div>
                    <div>
                        <Link to='/allListings'>go to all listings</Link>
                    </div>
                    <div>
                        <Link to='/create'>create a listing</Link>
                    </div>

                    <div>
                        <ul>
                            {fourListings}
                        </ul>
                    </div>

                    <div>
                        <Link to='/buy'>buy this</Link>
                    </div>

                </div>
            </body>)
    }
}

export default Home;

