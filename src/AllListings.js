import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//create new listing class
class AllListings extends Component {

    render() {
        return (
            <div>
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

