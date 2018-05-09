import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Home extends Component {

    render() {
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
                        <Link to='/buy'>buy this</Link>
                    </div>

                </div>
            </body>)
    }
}

export default Home;

