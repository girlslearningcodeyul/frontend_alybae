import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Link } from 'react-router-dom'
import './App.css';
import Login from './Login.js';
import Account from './Account.js'
import Home from './Home.js';
import Create from './Create.js';
import AllListings from './AllListings.js';
import Buy from './Buy.js';

import './App.css'





let renderHome = () => {
}

let renderAccount = () => {

}

let renderBuy = () => {

}

let renderCreateListing = () => {

}
let renderAllListings = () => {
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: undefined,


        }
    }

    setUsername = (username) => {
        this.setState({ username }) //is equivalent to username: username
    }

    renderLogin = (routeProps) => {
        console.log(routeProps)
        return <Login setUsername={this.setUsername} />
    }

    render() {
        //check is the this.state.username is undefined and then render the router and based on the route
        // else {
        return (
            <BrowserRouter>
                <div>
                    {(this.state.username === undefined) && <Redirect to="/login" />}
                    <Route exact={true} path='/login' render={this.renderLogin} />
                    <Route exact={true} path='/home' render={renderHome} />
                    <Route exact={true} path='/account' render={renderAccount} />
                    <Route exact={true} path='/buy' render={renderBuy} />
                    <Route exact={true} path='/create' render={renderCreateListing} />
                    <Route exact={true} path='/allListings' render={renderAllListings} />
                </div>
            </BrowserRouter>
        )
        // }
    }
}


export default App;