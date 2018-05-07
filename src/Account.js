import React, { Component } from 'react';
import './App.css';

class Account extends Component {
    
    itemsBought = () => {
        fetch('/itemsBought')
            .then(response => response.text())
            .then((items) => {
                this.setState({ itemsBought: JSON.parse(items) })
            })
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default Account;

