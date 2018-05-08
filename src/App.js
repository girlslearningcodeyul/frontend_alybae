import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Login from './Login.js';
import Account from './Account.js'
import Home from './Home.js';
import Create from './Create.js';
import AllListings from './AllListings.js';
import Buy from './Buy.js';

import './App.css'
//render all items
let renderHome = () => {
    return <Home />; //do we need props?
}

let renderAccount = () => {
    return <Account />
}

let renderBuy = () => {
    return <Buy />
}

let renderCreateListing = () => {
    return <Create />
}
let renderAllListings = () => {
    return <AllListings />
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
        //console.log(routeProps)
        return <Login setUsername={this.setUsername} historyPush={routeProps.history.push} />
    }

    render() {

        return (
            <BrowserRouter>
                {(this.state.username === undefined) ?
                    <Route path='/' render={this.renderLogin} /> : (
                        <div>
                            <Route exact={true} path='/home' render={renderHome} />
                            <Route exact={true} path='/account' render={renderAccount} />
                            <Route exact={true} path='/buy' render={renderBuy} />
                            <Route exact={true} path='/create' render={renderCreateListing} />
                            <Route exact={true} path='/allListings' render={renderAllListings} />
                        </div>
                    )}
            </BrowserRouter>
        )
    }
}


export default App;