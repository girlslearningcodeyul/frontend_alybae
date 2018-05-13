import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications';
import './App.css';
import Login from './Login.js';
import Account from './Account.js'
import Home from './Home.js';
import Create from './Create.js';
import AllListings from './AllListings.js';
import Buy from './Buy.js';

import './App.css'
import 'react-notifications/lib/notifications.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: undefined,
        }
    }

    // componentDidMount () {
    //     fetch("/checkLoginCookieMethod", {credentials: "same-origin"}) //check login cookie method
    //     .then(e=>e.text())
    //     .then(e=>JSON.parse(e))
    //     .then(e=>{
    //         console.log(e)
    //     })
    // }

    renderHome = () => {
        return <Home />;
    }

    renderAccount = () => {
        return <Account username={this.state.username} />
    }

    renderBuy = (routeProps) => {
        console.log(routeProps);
        let key = routeProps.match.params.key;
        return <Buy itemId={key} username={this.state.username} historyPush={routeProps.history.push} />
    }

    renderAllListings = () => {
        return <AllListings />
    }

    renderCreateListing = (routeProps) => {
        return <Create username={this.state.username} historyPush={routeProps.history.push} />
    }

    setUsername = (username) => {
        this.setState({ username }) //is equivalent to username: username
    }

    renderLogin = (routeProps) => {
        //console.log(routeProps)
        return (
            <div>
                <Login setUsername={this.setUsername} historyPush={routeProps.history.push} />
            </div>
        )
    }

    render() {
        //console.log(this.state)
        return (<div>
            <BrowserRouter>
                {(this.state.username === undefined) ?
                    <Route path='/' render={this.renderLogin} /> : (
                        <div>
                            <Route exact={true} path='/home' render={this.renderHome} />
                            <Route exact={true} path='/account' render={this.renderAccount} />
                            <Route exact={true} path='/buy/:key' render={this.renderBuy} /> {/* key is a named parameter: https://www.npmjs.com/package/path-to-regexp*/}
                            <Route exact={true} path='/create' render={this.renderCreateListing} />
                            <Route exact={true} path='/allListings' render={this.renderAllListings} />
                            <NotificationContainer />
                        </div>
                    )}
            </BrowserRouter>
        </div>
        )
    }
}


export default App;